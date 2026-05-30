import { connectDB } from "@/app/lib/database";
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function POST(request: NextRequest) {
    const body = await request.json();
    const email = body.email?.trim();
    const authCode = body.authCode;

    try {
        if(!email) {
            return NextResponse.json({ error: "잘못된 요청 또는 값이 없음"}, { status: 400 });
        }

        if(!authCode) {
            return NextResponse.json({ error: "잘못된 요청 또는 값이 없음", message: "인증코드를 작성해 주세요."}, { status: 400 });
        }

        const db = (await connectDB).db(dbName);
        const emailVerifications = await db.collection('email_verifications').findOne({
            email,
            authCode, 
        });

        if(!emailVerifications) {
            return NextResponse.json({ error: "인증코드가 일치하지 않습니다."}, { status: 400 });
        }

        if(Date.now() > emailVerifications.expiresAt) {
            await db.collection('email_verifications').updateOne(
                { email },
                { $set: { status: "fail" } }
            );

            return NextResponse.json({ error: "인증번호 유효시간 만료", message: "인증번호 유효시간이 만료되었습니다." }, {status: 401});
        }

        await db.collection('email_verifications').updateOne(
            { email },
            { $set: { status: "success" } }
        );

        return NextResponse.json({ message: "인증 성공" }, {status: 200});
    } catch(err) {
        console.error(err);
        return NextResponse.json({error: "서버 오류", message: "인증 코드 확인 서버 오류"}, {status: 500});
    }
};