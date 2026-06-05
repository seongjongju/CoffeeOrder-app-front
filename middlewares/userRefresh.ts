import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const accessTokenKey = process.env.JWT_ACCESS_SECRET;
const refreshTokenKey = process.env.JWT_REFRESH_SECRET;

export async function userRefresh(request: NextRequest) {
    const refreshToken = request.cookies.get('refresh_token')?.value; //사용자

    //사용자 리프레쉬 토큰 검사
    if(!refreshToken) {
        return NextResponse.json({ error: "refresh_token 토큰 없음", message: "refresh_token 토큰 없음" }, {status: 401});
    }

    try{
        //사용자가 refresh_token이 검증되면, 새로운 access_token을 발급한다.
        const decoded = jwt.verify(
            refreshToken,
            refreshTokenKey!
        ) as jwt.JwtPayload;

        const accessToken = jwt.sign(
            {
                id: decoded._id,
                userId: decoded.id,
                email: decoded.email,
                phoneNumber: decoded.phoneNumber,
                birth: decoded.birth,
            },
            accessTokenKey!,
            {
                expiresIn:'1h'
            }
        );

        const res = NextResponse.json({ success: true, message: "새 access_token 발급 완료"}, {status: 200});

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

        return res;
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "새 access_token발급 오류" }, {status: 500});
    }
};