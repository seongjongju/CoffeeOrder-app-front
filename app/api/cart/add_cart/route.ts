import { connectDB } from "@/app/lib/database";
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function POST(request:NextRequest) {
    const body = await request.json();
    const {
        userId,
        userName,
        productCode,
        img,
        productName,
        price,
        totalPrice,
        totalCount,
        lightly,
        addPrice,
        usedInventorys
    } = body;

    try{
        if(!productName || !productCode) {
            return NextResponse.json({ error: "값이 없거나 잘못된 접근", message: "값이 없거나 잘못된 접근입니다." }, {status: 400});
        }

        if(!totalPrice) {
            return NextResponse.json({ error: "값이 없거나 잘못됨", message: "값이 없거나 잘못되었습니다." }, {status: 400});
        }

        const db = (await connectDB).db(dbName);
        await db.collection('carts').insertOne({
            userId: userId,
            userName: userName,
            productCode: productCode,
            img: img,
            productName: productName,
            price: price,
            totalPrice: totalPrice,
            totalCount: totalCount,
            lightly: lightly,
            addPrice: addPrice,
            usedInventorys: usedInventorys
        });

        return NextResponse.json({ success: true, message: "장바구니에 추가되었습니다." }, {status: 200});
    }catch(err) {
        console.error(err);
        return NextResponse.json({ error: "장바구니 추가 서버오류", message: "장바구니 추가 서버 오류" });
    }
};