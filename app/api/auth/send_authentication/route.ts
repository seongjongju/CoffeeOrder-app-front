import { connectDB } from "@/app/lib/database";
import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const email = body.email?.trim();

    try {
        if(!email) {
            return NextResponse.json({ error: "잘못된 요청 또는 값이 없음", message: "이메일을 작성해주세요." }, { status: 400 });
        }

        const db = (await connectDB).db(dbName);
        const findEmail = await db.collection('users').findOne({email});

        if(findEmail) {
            return NextResponse.json({ error: "중복된 이메일", message: "이미 가입된 이메일입니다." }, { status: 409 });
        }

        //랜덤한 인증번호를 생성한다.
        const authCode = Math.floor(100000 + Math.random() * 900000).toString();

        //인증번호 유효 시간
        const expiresAt = Date.now() + 5 * 60 * 1000;

        //인증번호를 임시로 db에 저장한다.
        await db.collection('email_verifications').replaceOne(
            { email },
            {
                email,
                authCode,
                expiresAt,
                status: "pending",
                createdAt: new Date(),
            },
            { upsert: true }
        );

        //인증번호를 메일로 발송한다.
        let mailOptions = {
            from: `CoffeeOrder <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "coffeeOrder 이메일 인증번호",
            html: `
                <div style="font-family: sans-serif; width: 100%; max-width: 500px; margin: 0 auto;">
                    <h2>이메일 인증 번호</h2>
                    <p>아래 인증번호를 입력하여 이메일 인증을 완료해주세요.</p>
                    <div style="background-color: #f2f2f2; padding: 20px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 5px;">
                        ${authCode}
                    </div>
                    <p>인증번호는 5분간 유효합니다.</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: '인증코드가 발송되었습니다.' }, {status: 200});
    } catch(err) {
        console.error(err);
        return NextResponse.json({error: "서버 오류", message: "인증번호 발송 서버 오류 인증번호 발송에 실패했습니다."}, {status: 500});
    }
}