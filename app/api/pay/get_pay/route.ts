import { connectDB } from "@/app/lib/database";
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function GET(request:NextRequest) {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    try{
        if(!orderId) {
            return NextResponse.json({ error: "결제 정보 불러오기 에러", message: "결제 정보 불러오기 실패" }, {status: 400});
        }

        const db = (await connectDB).db(dbName);
        const paymentData = await db.collection("payments").findOne({ orderId: orderId });

        return NextResponse.json({ success: true, message: "결제정보 불러오기 성공", data: paymentData });
    }catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "결제 정보 불러오기 서버 에러" });
    }
};