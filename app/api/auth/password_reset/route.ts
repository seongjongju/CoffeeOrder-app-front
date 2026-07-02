import { connectDB } from "@/app/lib/database";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function PATCH(request:NextRequest) {
    const body = await request.json();
    const {
        userId, 
        phoneNumber, 
        newPassword
    } = body;

    try{
        if(
            !userId || 
            !phoneNumber ||
            !newPassword
        ) {
            return NextResponse.json({ error: "요청 값이 올바르지 않거나, 없음", message: "필수 입력 값을 확인해주세요." }, {status: 400});
        }

        //비밀번호가 현재 비밀번호와 같더라도 무조건 변경
        const db = (await connectDB).db(dbName);

        //비밀번호 해시값
        const hashPassword = await bcrypt.hash(newPassword, 10);

        await db.collection('users').updateOne(
            { id: userId, phoneNumber: phoneNumber },
            { 
                $set: {
                    password: hashPassword
                }
            }
        );

        return NextResponse.json({ success: true, message: "비밀번호가 변경되었습니다." }, {status: 200});
    }catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "비밀번호 재설정 서버 오류" }, {status: 500})
    }
}