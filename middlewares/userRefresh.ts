import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const accessTokenKey = process.env.JWT_ACCESS_SECRET;
const refreshTokenKey = process.env.JWT_REFRESH_SECRET;

export async function userRefresh(request: NextRequest) {  
    const pathname = request.nextUrl.pathname;

    if (!pathname.startsWith("/client")) {
        return;
    }

    if (
        pathname === "/client/intro" ||
        pathname.includes("/client/auth") ||
        pathname.includes("/client/user_find")
    ) {
        return;
    }

    const refreshToken = request.cookies.get('refresh_token')?.value; //사용자
    const accessToken = request.cookies.get('access_token')?.value; //사용자

    //사용자 리프레쉬 토큰 검사
    if(!refreshToken) {
        return NextResponse.redirect(new URL(`/client/intro?error=token_expired`, request.nextUrl));
    }

    //사용자가 refresh_token이 검증되면, 새로운 access_token을 발급한다.
    const refreshSecret = new TextEncoder().encode(
        refreshTokenKey!
    );

    const accessSecret = new TextEncoder().encode(
        accessTokenKey!
    );
    
    //엑세스 토큰 만료검사
    if(accessToken) {
        try {
            await jwtVerify(accessToken, accessSecret);
            return;
        } catch {}
    }

    try{
        const { payload } = await jwtVerify(
            refreshToken,
            refreshSecret
        );

        //타입 지정
        const jwtPayload = payload as {
            _id: string;
            id: string;
            name: string;
            email: string;
            phoneNumber: string;
            birth: string;
            role: string;
        };

        const accessToken = await new SignJWT(
            {
                _id: jwtPayload._id,
                id: jwtPayload.id,
                name: jwtPayload.name,
                email: jwtPayload.email,
                phoneNumber: jwtPayload.phoneNumber,
                birth: jwtPayload.birth,
                role: jwtPayload.role,
            },
        )
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(accessSecret);

        const res = NextResponse.next();

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
        return NextResponse.json({ error: '유효하지 않은 토큰' }, { status: 401 });
    }
};