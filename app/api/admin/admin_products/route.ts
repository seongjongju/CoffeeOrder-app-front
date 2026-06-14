import { connectDB } from "@/app/lib/database";
import { NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function GET() {
    try {
        const db = (await connectDB).db(dbName);
        const productCollection = await db.collection('products').find().toArray();

        if(productCollection.length === 0) {
            return NextResponse.json({ message: "등록된 제품이 없습니다." }, {status: 400});
        }

        return NextResponse.json({ message: "전체 제품 조회 성공", products: productCollection }, {status: 200});
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "제품 조회 서버 오류" }, {status: 500});
    }
};