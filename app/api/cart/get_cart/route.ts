import { connectDB } from "@/app/lib/database";
import { NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function GET() {
    try{
        const db = (await connectDB).db(dbName);
        const carts = await db.collection('carts').find().toArray();
        
        return NextResponse.json({ success: true, result: carts });
    }catch(err) {
        console.error(err);
        return NextResponse.json({ error: "장바구니 조회 서버 오류", message: "장바구니 조회 서버 오류", })
    }
};