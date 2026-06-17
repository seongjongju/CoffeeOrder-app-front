import { connectDB } from "@/app/lib/database";
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function DELETE(request:NextRequest) {
    const body = await request.json();
    const {productArray} = body;
    
    try {
        if(productArray.length === 0) {
            return NextResponse.json({ error: "값이 없거나 잘못된 값", message: "잘못된 요청입니다." }, {status: 400});
        }

        const prdCode = productArray.map((prd:{ productCode: string }) => prd.productCode);

        const db = (await connectDB).db(dbName);
        await db.collection('products').deleteMany({ productCode: { $in: prdCode } });

        return NextResponse.json({ success: true, message: "일괄 삭제가 완료되었습니다." }, {status: 200});
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "제품 일괄 삭제 서버 오류" }, {status: 500});
    }
};