import { connectDB } from "@/app/lib/database";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;
const accessTokenKey = process.env.JWT_ADMIN_ACCESS_SECRET;
const refreshTokenKey = process.env.JWT_ADMIN_REFRESH_SECRET;

export async function POST(request :NextRequest) {
    const body = await request.json();
    const {adminId, password} = body;

    try {
        if(!adminId || !password) {
            return NextResponse.json({ errro: "값이 잘못되었거나 없음", message: "아이디와 패스워드를 모두 입력해주세요." }, {status: 400});
        }

        const db = (await connectDB).db(dbName);
        const findAdmin = await db.collection("admins").findOne({ adminId });

        if(!findAdmin) {
            return NextResponse.json({ errro: "관리자 없음", message: "관리자가 존재하지 않습니다. 관리자를 생성해주세요." }, {status: 401});
        }

        const isMatch = await bcrypt.compare(
            password,
            findAdmin.password
        );

        if(!isMatch) {
            return NextResponse.json({ errro: "패스워드 불일치", message: "아이디 또는 패스워드가 일치하지 않습니다." }, {status: 401});
        }

        //엑세스 토큰 발급
        const accessToken = jwt.sign(
            {
                id: findAdmin._id,
                adminId: adminId,
                role: findAdmin.role,
            },
            accessTokenKey!,
            {
                expiresIn:'5s',
            }
        );

        //리프레쉬 토큰 발급
        const refreshToken = jwt.sign(
            {
                id: findAdmin._id,
                adminId: adminId,
                role: findAdmin.role,
            },
            refreshTokenKey!,
            {
                expiresIn:'7d',
            }
        );

        const res = NextResponse.json({ success: true, message: "로그인 성공"}, {status: 200});
        
        //쿠키에 엑세스 토큰을 저장한다.
        res.cookies.set(
            "admin_access_token",
            accessToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 5,
                path: '/',
            }
        );

        //쿠키에 리프레쉬 토큰을 저장한다.
        res.cookies.set(
            "admin_refresh_token",
            refreshToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            }
        );

        return res;
    } catch(err: any) {
        console.error(err.message);
        return NextResponse.json({ error: "서버 오류", message: "관리자 로그인 서버 오류" }, {status: 500});
    } 
};
