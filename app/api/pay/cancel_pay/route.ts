import { connectDB } from "@/app/lib/database";
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function PATCH(request:NextRequest) {
    const body = await request.json();
    const {orderId} = body;

    try{
        if(!orderId) {
            return NextResponse.json({ error: "주문 확인 불가", message: "주문을 확인할 수 없습니다." }, {status: 400});
        }

        const db = (await connectDB).db(dbName);
        await db.collection('payments_temp').updateOne(
            {orderId: orderId},
            {
                $set: {
                    status: "cancel"
                }
            }
        );

        return NextResponse.json({ success: true, message: "결제 취소 성공" }, {status: 200});
    }catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "결제 취소 서버 오류 관리자에게 문의하세요." }, {status: 500});
    }   
};