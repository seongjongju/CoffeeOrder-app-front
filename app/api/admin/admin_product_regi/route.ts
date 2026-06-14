import { connectDB } from "@/app/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

const dbName = process.env.DB_NAME;

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request:NextRequest) {
    const body = await request.json();
    const {
        img,
        productName,
        category,
        usedInventorys,
        price,
        recommend,
        productInfos
    } = body;

    try {
        if(
            !img ||
            !productName ||
            !category ||
            !usedInventorys ||
            !price
        ) {
            return NextResponse.json({ error: "필수 입력 값 누락", message: "필수 입력 값을 확인해주세요." }, {status: 401});
        }

        const db = (await connectDB).db(dbName);
        
        //제품 코드를 위한 자동 카운팅
        let counter = await db.collection('products_counter').findOneAndUpdate(
            { name: "totalPost" },
            { $inc: { total: 1 } },
            { returnDocument: 'after' }
        );

        let newProductId = counter?.total; 

        //제품 등록
        db.collection('products').insertOne({
            productCode: `PRD-${newProductId}`,
            img: img,
            productName: productName,
            category: category,
            usedInventorys: usedInventorys,
            price: price,
            recommend: recommend,
            productInfos: productInfos
        });

        return NextResponse.json({ success: true, message: "제품 등록이 완료되었습니다." }, {status: 200});
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "제품등록 서버 오류" }, {status: 500})
    }
};