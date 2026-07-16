import { connectDB } from "@/app/lib/database";
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const orderType = searchParams.get('orderType');

        const body = await request.json();
        const { status, orderId, amount, tid, resultCode } = body;

        const db = (await connectDB).db(dbName);

        // 이미 처리된 결제인지 확인
        const alreadyPaid = await db.collection('payments').findOne({ orderId: orderId });
        if (alreadyPaid) {
            return NextResponse.json({ result: "SUCCESS" }, { status: 200 });
        }

        // 임시 대기방에서 주문 조회
        const selectAmount = await db.collection('payments_temp').findOne({ orderId: orderId });

        if (!selectAmount) {
            return NextResponse.json({ result: "FAIL", message: "유효한 결제 대기 내역을 찾을 수 없습니다." }, { status: 400 });
        }

        if (selectAmount.status === 'paid' || selectAmount.status === 'fail') {
            return NextResponse.json({ result: "SUCCESS" }, { status: 200 });
        }

        // 금액 검증
        if (Number(selectAmount.amount) !== Number(amount)) {
            await db.collection('payments_temp').updateOne(
                { orderId: orderId },
                { $set: { status: "fail", createdAt: new Date() } }
            );
            return NextResponse.json({ result: "FAIL", message: "결제 금액이 일치하지 않아 처리가 취소되었습니다." }, { status: 400 });
        }

        if (resultCode === "0000") {
            // payments 컬렉션으로 이관
            await db.collection('payments').insertOne({
                orderId: orderId,
                userId: selectAmount.userId,
                items: selectAmount.items,
                amount: amount,
                tid: tid,
                orderType: orderType,
                status: "paid",
                createdAt: new Date()
            });

            // 임시 데이터 삭제
            await db.collection('payments_temp').deleteOne({ orderId: orderId });

            //장바구니 결제 시, 장바구니를 비워준다.
            if(orderType === "cart") {
                await db.collection('carts').deleteMany({userId: selectAmount.userId});
            }
        } else {
            await db.collection('payments_temp').updateOne(
                { orderId: orderId },
                { $set: { status: "fail", createdAt: new Date() } }
            );
            return NextResponse.json({ result: "FAIL", message: "오류로 인해 결제에 실패하였습니다." }, { status: 400 });
        }

        return NextResponse.json({ result: "SUCCESS" }, { status: 200 });

    } catch (err) {
        console.error("Webhook 처리 중 치명적 에러 발생:", err);
        return NextResponse.json({ result: "FAIL", message: "Internal Server Error" }, { status: 500 });
    }
}