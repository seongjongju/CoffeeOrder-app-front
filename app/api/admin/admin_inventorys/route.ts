import { connectDB } from "@/app/lib/database";
import { NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function GET() {
    try {
        const db = (await connectDB).db(dbName);
        const inventoryCollection = await db.collection('inventory').find().toArray();

        if(inventoryCollection.length === 0) {
            return NextResponse.json({ message: "등록된 재고가 없습니다." }, {status: 400});
        }

        return NextResponse.json({ message: "전체 재고 조회 성공", inventorys: inventoryCollection }, {status: 200});
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "재고 조회 서버 오류" }, {status: 500});
    }
};