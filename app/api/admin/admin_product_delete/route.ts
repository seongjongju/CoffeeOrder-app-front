import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/database";

const dbName = process.env.DB_NAME;

export async function DELETE(request: NextRequest) {
    const body = await request.json();
    const {productCode} = body;

    try{
        if(!productCode) {
            return NextResponse.json({ error: "잘못된 값", message: "잘못된 접근 혹은 올바르지 않은 값이 요청되었습니다." }, {status: 400});
        }

        const db = (await connectDB).db(dbName);

        db.collection('products').deleteOne({productCode});

        return NextResponse.json({success: true, message: "제품이 삭제되었습니다."});
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버오류", message: "제품 삭제 서버 오류" });
    }
};