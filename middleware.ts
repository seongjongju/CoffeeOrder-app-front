import { NextRequest, NextResponse } from "next/server";
import { authority } from "./middlewares/authority";
import { adminRefresh } from "./middlewares/adminRefresh";
import { userRefresh } from "./middlewares/userRefresh";

export default async function middleware(request: NextRequest) {
    //어드민 / 사용자 권한
    const authorityRes = await authority(request);

    // if(authorityRes) {
    //     return authorityRes;
    // }

    //어드민 리프레쉬 토큰
    // const adminRefreshRes = await adminRefresh(request);
    // if(adminRefreshRes) {
    //     return adminRefreshRes;
    // }

    //사용자 리프레쉬 토큰
    // const userRefreshRes = await userRefresh(request);
    // if(userRefreshRes) {
    //     return userRefreshRes;
    // }

    return NextResponse.next();
};

export const config = {
    matcher: [
        '/',
        '/admin/:path*',
        '/client/:path*',
    ],
};
