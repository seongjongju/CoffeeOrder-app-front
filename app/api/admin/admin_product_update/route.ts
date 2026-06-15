import { connectDB } from "@/app/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function PATCH(request: NextRequest) {
    const body = await request.json();
    const {
        productCode,
        img,
        productName,
        category,
        usedInventorys,
        price,
        recommend,
        productInfos
    } = body; 

    try{
        if(
            !productCode ||
            !img ||
            !productName ||
            !category ||
            !usedInventorys ||
            !price
        ) {
            return NextResponse.json({ error: "값이 없거나 잘못되었습니다.", message: "입력 필드를 확인해주세요." }, {status: 400});
        }

        //undefined가 아닌 데이터만 
        const updateFields: any = {};

        if (img !== undefined) updateFields.img = img;
        if (productName !== undefined) updateFields.productName = productName;
        if (category !== undefined) updateFields.category = category;
        if (usedInventorys !== undefined) updateFields.usedInventorys = usedInventorys;
        if (price !== undefined) updateFields.price = price;
        if (recommend !== undefined) updateFields.recommend = recommend;
        if (productInfos !== undefined) updateFields.productInfos = productInfos;

        const db = (await connectDB).db(dbName);

        await db.collection('products').updateOne(
            { productCode: productCode },
            { $set: updateFields }
        );

        return NextResponse.json({ success: true, message: "제품수정이 완료되었습니다." }, {status: 200});
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "제품 수정 서버 오류" }, {status: 500});
    }
};