import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const accessTokenKey = process.env.JWT_ADMIN_ACCESS_SECRET;
const refreshTokenKey = process.env.JWT_ADMIN_REFRESH_SECRET;

export async function adminRefresh(request: NextRequest) {
    const adminRefreshToken = request.cookies.get("admin_refresh_token")?.value; //어드민

    //어드민 리프레쉬 토큰 검사
    if(!adminRefreshToken) {
        return NextResponse.json({ error: "refresh_token 토큰 없음", message: "refresh_token 토큰 없음" }, {status: 401});
    }

    try{
        //어드민이 refresh_token이 검증되면, 새로운 access_token을 발급한다.
        const decoded = jwt.verify(
            adminRefreshToken,
            refreshTokenKey!
        ) as jwt.JwtPayload;

        const accessToken = jwt.sign(
            {
                id: decoded._id,
                adminId: decoded.adminId,
                role: decoded.role,
            },
            accessTokenKey!,
            {
                expiresIn:'1h'
            }
        );

        const res = NextResponse.json({ success: true, message: "새 access_token 발급 완료"}, {status: 200});

        res.cookies.set(
            "admin_access_token",
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