import { connectDB } from "@/app/lib/database";
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

//나이스페이먼츠
const clientId = process.env.NEXT_PUBLIC_NICEPAY_CLIENT_ID;
const secretKey = process.env.NEXT_PUBLIC_NICEPAY_SECRET_KEY;

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const authResultCode = formData.get("authResultCode") as string;
        const authToken = formData.get("authToken") as string;
        const paymentKey = formData.get("paymentKey") as string;
        const tid = formData.get("tid") as string;
        const amount = formData.get("amount") as string;
        const orderId = formData.get("orderId") as string; 

        const db = (await connectDB).db(dbName);

        //여기서 pending상태에 결제 데이터를 가져와 amount가격을 비교 후 처리

        if(authResultCode !== "0000") {
            await db.collection('payments').updateOne(
                {orderId: orderId},
                {
                    $set: { 
                        status: "fail",
                        createAt: new Date()
                    } 
                }
            );
            return NextResponse.redirect(new URL("/client/pay/pay_fail?error=결제실패&status=fail&message=오류로 인해 결제에 실패하였습니다.", request.url));
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_NICEPAY_URL}/${tid}`, {
            method: "POST",
            headers: {
                Authorization: "Basic " + Buffer.from(clientId + ":" + secretKey).toString("base64"), 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: Number(amount) }),
        });

        const resultData = await response.json();

        if (!response.ok || resultData.resultCode !== "0000") {
            await db.collection('payments').updateOne(
                {orderId: orderId},
                {
                    $set: { 
                        status: "fail",
                        createAt: new Date()
                    } 
                }
            );
            return NextResponse.redirect(new URL(`/client/pay/pay_fail?error=결제실패&status=fail&message=${resultData.resultMsg}`, request.url));
        }

        await db.collection('payments').updateOne(
            {orderId: orderId},
            {
                $set: { 
                    status: "paid",
                    createAt: new Date()
                } 
            }
        );

        return NextResponse.redirect(new URL(`/client/pay/pay_success`, request.url));
    } catch (err) {
        console.error("POST 데이터 처리 중 에러:", err);
        return NextResponse.json({ status: "fail", message: "에러 발생" }, { status: 500 });
    }
}