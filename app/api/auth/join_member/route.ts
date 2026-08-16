import { connectDB } from "@/app/lib/database";
import { validations } from "@/app/util/client/Validation";
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";

const dbName = process.env.DB_NAME;

export async function POST(request: NextRequest) {
    const body = await request.json();

    const {
        id,
        password,
        name,
        phoneNumber,
        email,
        birth,
    } = body;

    try {
        if(
            !id ||
            !password ||
            !name ||
            !phoneNumber ||
            !email ||
            !birth
        ) {
            return NextResponse.json({ error: "값이 없거나 잘못된 요청", message: "필수 입력값을 확인해주세요.",}, {status: 400});
        }

        const db = (await connectDB).db(dbName);

        //이메일 인증번호 인증
        const emailVerifications = await db.collection('email_verifications').findOne({
            email
        });

        if (!emailVerifications) {
            return NextResponse.json(
                { error: "인증 없음", message: "이메일 인증을 먼저 진행해주세요." },
                { status: 403 }
            );
        }

        if (emailVerifications.status === "fail") {
            return NextResponse.json(
                { error: "인증 상태 fail", message: "인증 코드가 인증에 실패하였습니다. 다시 시도해주세요." },
                { status: 409 }
            );
        }

        if (emailVerifications.status !== "success") {
            return NextResponse.json(
                { error: "미인증", message: "이메일 인증을 완료해주세요." },
                { status: 403 }
            );
        }

        //이름 유효성 검사
        if (!validations.nameRegex.test(name.trim())) {
            return NextResponse.json(
                {error: "유효하지 이름", message: "필수 입력 값을 확인해주세요.(유효하지 않은 값)"},
                {status: 400}
            )
        }

        //연락처 중복 검사
        const userPhoneNumber = await db.collection('users').findOne({
            phoneNumber
        });

        console.log(userPhoneNumber);

        if(userPhoneNumber) {
            console.log("연락처 중복");
            return NextResponse.json(
                {error: "이미 가입된 연락처", message: "이미 사용중인 연락처입니다."},
                {status: 409}
            )
        }

        //생년월일 유효성 검사
        if (!validations.birthRegex.test(birth.trim())) {
            return NextResponse.json(
                {error: "유효하지 않은 생년월일", message: "필수 입력 값을 확인해주세요.(유효하지 않은 값)"},
                {status: 400}
            )
        }

        //비밀번호 유효성 검사
        if(!validations.passwordRegex.test(password.trim())) {
             return NextResponse.json(
                {error: "유효하지 않은 비밀번호", message: "필수 입력 값을 확인해주세요.(유효하지 않은 값)"},
                {status: 400}
            )
        }

        //비밀번호 해시값
        const hashPassword = await bcrypt.hash(password, 10);

        //status 값이 success면 users 컬렉션에 삽입한다.
        await db.collection('users').insertOne({
            id: id,
            password: hashPassword,
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            birth: birth,
            role: "user",
            createdAt: new Date(),
        });

        return NextResponse.json({ 
            success: true, 
            message: "회원가입이 완료되었습니다.",
        }, {status: 201});
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: "서버 오류", message: "회원가입 서버 오류" }, {status: 500});
    }
}
