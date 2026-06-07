import { connectDB } from "@/app/lib/database";
import { NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function GET() {
    try {
        const db = (await connectDB).db(dbName);
        const usersColletion = await db.collection('users').find().sort({ 'createdAt': -1 }).toArray(); 
        
        if(usersColletion.length === 0) {
            return NextResponse.json({ message: "가입된 회원이 없습니다." }, {status: 400});
        }

        //패스워드는 빼고 나머지 정보를 보낸다.
        const members = usersColletion.map(({ password, ...rest }) => rest);
        
        return NextResponse.json({ message: "전체 회원 조회 성공", members: members }, {status: 200});
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "전체 회원 조회 서버 오류" }, {status: 500});
    }
};