import { connectDB } from "@/app/lib/database";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;
const accessTokenKey = process.env.JWT_ACCESS_SECRET;
const refreshTokenKey = process.env.JWT_REFRESH_SECRET;

export async function POST(request :NextRequest) {
    const body = await request.json();
    const {id, password} = body;

    try {
        if(!id || !password) {
            return NextResponse.json({ errro: "값이 잘못되었거나 없음", message: "아이디와 패스워드를 모두 입력해주세요." }, {status: 400});
        }

        const db = (await connectDB).db(dbName);
        const findMember = await db.collection("users").findOne({ id });

        if(!findMember) {
            return NextResponse.json({ errro: "회원 없음", message: "가입된 정보가 없습니다. 회원가입을 진행해주세요." }, {status: 401});
        }

        const isMatch = await bcrypt.compare(
            password,
            findMember.password
        );

        if(!isMatch) {
            return NextResponse.json({ errro: "패스워드 불일치", message: "아이디 또는 패스워드가 일치하지 않습니다." }, {status: 401});
        }

        //엑세스 토큰 발급
        const accessToken = jwt.sign(
            {
                _id: findMember._id,
                id: id,
                name: findMember.name,
                phoneNumber: findMember.phoneNumber,
                email: findMember.email,
                birth: findMember.birth,
                role: findMember.role,
                createdAt: findMember.createdAt,
            },
            accessTokenKey!,
            {
                expiresIn:'1h',
            }
        );

        //리프레쉬 토큰 발급
        const refreshToken = jwt.sign(
            {
                _id: findMember._id,
                id: id,
                name: findMember.name,
                phoneNumber: findMember.phoneNumber,
                email: findMember.email,
                birth: findMember.birth,
                role: findMember.role,
                createdAt: findMember.createdAt,
            },
            refreshTokenKey!,
            {
                expiresIn:'7d',
            }
        );

        const res = NextResponse.json({ success: true, message: "로그인 성공"}, {status: 200});
        
        //쿠키에 엑세스 토큰을 저장한다.
        res.cookies.set(
            "access_token",
            accessToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60
            }
        );

        //쿠키에 리프레쉬 토큰을 저장한다.
        res.cookies.set(
            "refresh_token",
            refreshToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7
            }
        );

        return res;
    } catch(err: any) {
        console.error(err.message);
        return NextResponse.json({ error: "서버 오류", message: "유저 로그인 서버 오류" }, {status: 500});
    } 
};
