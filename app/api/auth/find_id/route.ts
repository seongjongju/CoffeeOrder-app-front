import { connectDB } from "@/app/lib/database";
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function POST(request: NextRequest) {
    const body = await request.json();
    const email = await body.email?.trim();

    try {
        if(!email) {
            return NextResponse.json({ error: "이메일 미입력", message: "이메일을 입력해주세요."}, {status: 400 });
        }

        const db = (await connectDB).db(dbName);
        const users = await db.collection("users").findOne({email});

        if(!users) {
            return NextResponse.json({ error: "미가입 유저", message: "가입된 유저가 없습니다. 회원가입을 진행해 주세요." }, {status: 404});
        }

        return NextResponse.json({success: true, message: "아이디 찾기 성공", userId: users.id}, {status: 200});
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "아이디 찾기 서버 오류" }, {status: 500});
    }
};