import { NextResponse } from "next/server";

export async function POST() {
    try {
        const res = NextResponse.json({ success: true, message: "로그아웃이 완료되었습니다." }, {status: 200});

        res.cookies.delete("access_token");
        res.cookies.delete("refresh_token");

        return res;
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "로그아웃 서버 오류" }, {status: 500})
    }    
};
