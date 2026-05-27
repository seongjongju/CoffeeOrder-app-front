import { connectDB } from "@/app/lib/database";
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.USER_DB_NAME;

export async function POST(request: NextRequest) {
    const body = await request.json();
    const id = body.id?.trim();
    
    try {
        if(!id) {
            return NextResponse.json({ error: "잘못된 요청 또는 값이 없음", message: "잘못된 요청입니다." }, { status: 400 });
        } 

        const db = (await connectDB).db(dbName);
        const findId = await db.collection('users').findOne({id});

        console.log(db);

        if(findId) {
            return NextResponse.json({ error: "중복된 아이디", message: "이미 사용중인 아이디입니다." }, { status: 409 });
        }

        return NextResponse.json({ message: "사용 가능한 아이디입니다." }, { status: 200 });
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "아이디 중복확인 서버 오류" }, { status: 500 });
    }
}
