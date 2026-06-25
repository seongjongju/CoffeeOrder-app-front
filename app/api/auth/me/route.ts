import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const accessTokenKey = process.env.JWT_ACCESS_SECRET;

export async function GET () {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if (!accessToken) {
        return NextResponse.json({ error: '토큰 인증 실패' }, { status: 401 });
    }

    try{
        const secret = new TextEncoder().encode(accessTokenKey);
        const {payload} = await jwtVerify(accessToken, secret);

        return NextResponse.json({
            _id: payload.sub,
            userName: payload.name,
            userId: payload.id,
            phoneNumber: payload.phoneNumber,
            email: payload.email,
        });
    }catch(err) {
        console.error(err);
        return NextResponse.json({ error: '유효하지 않은 토큰' }, { status: 401 });
    }
};
