import { NextRequest, NextResponse } from "next/server";

export async function authority(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const adminToken = request.cookies.get('admin_access_token')?.value; //어드민
    const token = request.cookies.get('access_token')?.value; //사용자

    //어드민 페이지
    if(pathname.startsWith("/admin")) {
        if(pathname === "/admin/admin_login") {
            return NextResponse.next();
        }

        if(!adminToken) {
            return NextResponse.redirect(new URL(`/admin/admin_login?error=login_required`, request.nextUrl));
        }
    }

    //사용자 페이지
    if (!token && pathname === "/") {
        return NextResponse.redirect(
            new URL(`/client/intro?error=login_required`, request.nextUrl)
        );
    }

    if(pathname.startsWith("/client")) {
        if(
            pathname === "/client/intro" ||
            pathname.includes('/client/auth') ||
            pathname.includes('/client/user_find')
        ) {
            return NextResponse.next();
        }

        if(!token) {
            return NextResponse.redirect(new URL(`/client/intro?error=login_required`, request.nextUrl))
        }
    }

    return;
};
