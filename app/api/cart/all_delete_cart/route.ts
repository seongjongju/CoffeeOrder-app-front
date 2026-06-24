import { connectDB } from "@/app/lib/database";
import { NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function DELETE() {
    try{
        const db = (await connectDB).db(dbName);
        await db.collection('carts').deleteMany({});

        return NextResponse.json({ success: true, message: "삭제가 완료되었습니다." }, {status: 200});
    }catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "장바구니 단일 삭제 서버 오류" }, {status: 500});
    };
};