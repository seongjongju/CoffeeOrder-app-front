import { connectDB } from "@/app/lib/database";
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function POST(request:NextRequest) {
    const body = await request.json();
    const {
        img,
        productName,
        category,
        inventorys, //배열 객체 필수입력값
        productInfos, //배열 객체 필수 아님
    } = body;

    try{
        if(!img || !productName || !category || !inventorys) {
            return NextResponse.json({ error: "값이 잘못되거나 필수 입력 값 누락", message: "필수 입력 값을 확인해주세요." }, {status: 400});
        }

        const db = (await connectDB).db(dbName);

        //제품번호를 자동 부여
        const counter = await db.collection('counter').findOneAndUpdate(
            { name: 'totalPost' },
            { $inc: { total: 1 } },
            { returnDocument: 'after' } // 증가된 후의 데이터를 반환
        );

        await db.collection('products').insertOne({
            productNumber: `PRD-${counter!.total}`,
            img: img,
            productName: productName,
            category: category,
            inventorys: inventorys,
            productInfos: productInfos
        });

        return NextResponse.json({ 
            success: true, 
            message: "제품등록이 완료되었습니다.",
        }, {status: 201});
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "제품등록 서버 오류" }, {status: 500});
    }
};