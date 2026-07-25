import { connectDB } from "@/app/lib/database";
import { NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function GET() {
    try{
        const db = (await connectDB).db(dbName);
        const ordersData = await db.collection("payments").find().sort({ "createdAt": -1 }).toArray();

        return NextResponse.json({ success: true, message: "주문 내역 불러오기 성공", result: ordersData });
    }catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "주문 내역 불러오기 서버 에러" });
    }
};