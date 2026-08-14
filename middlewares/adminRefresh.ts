import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const accessTokenKey = process.env.JWT_ADMIN_ACCESS_SECRET;
const refreshTokenKey = process.env.JWT_ADMIN_REFRESH_SECRET;

export async function adminRefresh(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
        if (!pathname.startsWith("/admin")) {
        return;
    }

    if (pathname === "/admin/admin_login") {
        return;
    }

    const adminRefreshToken = request.cookies.get("admin_refresh_token")?.value; //어드민
    const adminAccessToken = request.cookies.get("admin_access_token")?.value; //어드민

    //어드민 리프레쉬 토큰 검사
    if(!adminRefreshToken) {
        return NextResponse.redirect(new URL(`/admin/admin_login?error=token_expired`, request.nextUrl));
    }

    //어드민이 refresh_token이 검증되면, 새로운 access_token을 발급한다.
    const refreshSecret = new TextEncoder().encode(
        refreshTokenKey!
    );

    const accessSecret = new TextEncoder().encode(
        accessTokenKey!
    );

    //엑세스 토큰 만료검사
    if (adminAccessToken) {
        try {
            await jwtVerify(adminAccessToken, accessSecret);
            return;
        } catch {}
    }

    try{
        const { payload } = await jwtVerify(
            adminRefreshToken,
            refreshSecret
        );

        //타입 지정
        const jwtPayload = payload as {
            _id: string;
            adminId: string;
            role: string;
        };

        const accessToken = await new SignJWT(
            {
                id: jwtPayload._id,
                adminId: jwtPayload.adminId,
                role: jwtPayload.role,
            },
        )
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(accessSecret);

        const res = NextResponse.next();

        res.cookies.set(
            "admin_access_token",
            accessToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60,
                path: '/',
            }
        );

        request.cookies.set('admin_access_token', accessToken);

        return res;
    } catch(err) {
        console.error(err);
        return NextResponse.redirect(new URL(`/admin/admin_login?error=token_expired`, request.nextUrl));
    }
};