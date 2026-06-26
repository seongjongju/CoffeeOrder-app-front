import { connectDB } from "@/app/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function PATCH(request: NextRequest) {
    const body = await request.json();
    const { 
        _id,
        totalPrice,
        totalCount
    } = body;

    try{
        if(
            !_id ||
            !totalPrice ||
            !totalCount
        ) {
            return NextResponse.json({ error: "요청 값이 없거나 잘못됨", message: "요청 값을 확인해주세요." });
        }

        //undefined가 아닌 데이터만
        const updateItems: any = {};

        if(totalPrice !== undefined) updateItems.totalPrice = totalPrice;
        if(totalCount !== undefined) updateItems.totalCount = totalCount;

        const db = (await connectDB).db(dbName);

        await db.collection('carts').updateOne(
            {_id: new ObjectId(_id)},
            {$set: updateItems}
        );

        return NextResponse.json({ success: true, message: "장바구니 업데이트 성공" });
    }catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "장바구니 수정 서버 오류" });
    }
};