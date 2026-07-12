import { connectDB } from "@/app/lib/database";
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function POST(request:NextRequest) {
    const body = await request.json();
    const {orderItems} = body;

    console.log("결제 정보", orderItems);
    console.log("-----------------------------");

    try{
        if(!orderItems) {
        return NextResponse.json({error: "결제 오류", message: "결제 오류! 관리자에게 문의해주세요."}, {status: 401});
        }

        const db = (await connectDB).db(dbName);
        //주문 아이디를 위한 자동 카운팅
        let counter = await db.collection('payments_counter').findOneAndUpdate(
            { name: "totalPost" },
            { $inc: { total: 1 } },
            { returnDocument: 'after' }
        );

        let newOrderId = counter?.total; 

        //여기서 amount 계산 후 DB에 자리 만들어 놓기

        //결제 상태 = pending
        await db.collection('payments').insertOne({
            orderId: `ORD-${newOrderId}`,
            status: 'pending',
            items: orderItems,
            createAt: new Date()
        });

        return NextResponse.json({ status: "pending", message: "주문서 생성", orderId: `ORD-${newOrderId}`, items: orderItems });
    }catch(err) {
        console.error(err);
        return NextResponse.json({ status: "fail", error: "주문서 생성 오류", message: "결제 준비 오류" }, {status: 500});
    }
};