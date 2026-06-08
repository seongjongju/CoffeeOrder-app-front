import { connectDB } from "@/app/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function DELETE(request:NextRequest) {
    const body = await request.json();
    const {inventoryArray} = body;
    
    try {
        if(inventoryArray.length === 0) {
            return NextResponse.json({ error: "값이 없거나 잘못된 값", message: "잘못된 요청입니다." }, {status: 401});
        }

        const ids = inventoryArray.map((iv:{ _id: string }) => new ObjectId(iv._id));

        const db = (await connectDB).db(dbName);
        await db.collection('inventory').deleteMany({ _id: { $in: ids } });

        return NextResponse.json({ success: true, message: "일괄 삭제가 완료되었습니다." }, {status: 200});
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "재고 일괄 삭제 서버 오류" }, {status: 500});
    }
};