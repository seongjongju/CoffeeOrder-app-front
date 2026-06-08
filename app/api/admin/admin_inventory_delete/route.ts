import { connectDB } from "@/app/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function DELETE(request:NextRequest) {
    const body = await request.json();
    const {_id} = body;

    try {
        if(!_id) {
            return NextResponse.json({ error: "값이 없거나 잘못된 값", message: "잘못된 요청입니다." }, {status: 401});
        }

        const db = (await connectDB).db(dbName);
        await db.collection('inventory').deleteOne({ _id: new ObjectId(_id) });

        return NextResponse.json({ success: true, message: "삭제가 완료되었습니다." }, {status: 200});
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "재고 삭제 서버 오류" }, {status: 500});
    }
};