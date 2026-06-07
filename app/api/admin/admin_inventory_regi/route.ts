import { connectDB } from "@/app/lib/database";
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function POST(request: NextRequest) {
    const body = await request.json();
    const {
        inventoryName,
        category,
        quantity
    } = body;

    try{
        if(
            !inventoryName || 
            !category ||
            !quantity 
        ) {
            return NextResponse.json({ error: "값이 없거나 잘못되었습니다.", message: "필수 입력 값을 확인해주세요." }, {status: 400});
        }

        const db = (await connectDB).db(dbName);

        await db.collection('inventory').insertOne({
            inventoryName: inventoryName,
            category: category,
            quantity: quantity
        });

        return NextResponse.json({ success: true, message: "재고 등록이 완료되었습니다." }, {status: 200});
    }catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "재고 등록 서버 오류" }, {status: 500});
    }
};