import { connectDB } from "@/app/lib/database";
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { status, orderId, amount, tid, resultCode } = body;

        const db = (await connectDB).db(dbName);
        const selectAmount = await db.collection('payments').findOne({ orderId: orderId });

        if (!selectAmount) {
            return NextResponse.redirect(new URL("/client/pay/pay_fail?error=주문조회실패&status=fail&message=유효한 결제 대기 내역을 찾을 수 없습니다.", request.url));
        }

        if (selectAmount.status === 'paid') {
            return NextResponse.json({ result: "SUCCESS" }, { status: 200 });
        }
        if (selectAmount.status === 'fail') {
            return NextResponse.json({ result: "SUCCESS" }, { status: 200 });
        }

        if (Number(selectAmount.amount) !== Number(amount)) {
            await db.collection('payments').updateOne(
                { orderId: orderId },
                {
                    $set: { 
                        status: "fail",
                        createdAt: new Date()
                    } 
                }
            );
            return NextResponse.redirect(new URL("/client/pay/pay_fail?error=금액 불일치&status=fail&message=결제 금액이 일치하지 않아 처리가 취소되었습니다.", request.url));
        }

        if (resultCode === "0000") {
            await db.collection('payments').updateOne(
                { orderId: orderId },
                {
                    $set: { 
                        status: "paid",
                        tid: tid,
                        createdAt: new Date()
                    } 
                }
            );
        } else {
            await db.collection('payments').updateOne(
                { orderId: orderId },
                {
                    $set: { 
                        status: "fail",
                        createdAt: new Date()
                    } 
                }
            );
            return NextResponse.redirect(new URL("/client/pay/pay_fail?error=결제실패&status=fail&message=오류로 인해 결제에 실패하였습니다.", request.url));
        }

        return NextResponse.json({ result: "SUCCESS" }, { status: 200 });

    } catch (err) {
        console.error("Webhook 처리 중 치명적 에러 발생:", err);
        return NextResponse.json({ result: "FAIL", message: "Internal Server Error" }, { status: 500 });
    }
};