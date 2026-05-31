import axios from "axios";

export const api = axios.create({
    baseURL: '/api/auth',
    withCredentials: true
});

//*************************회원가입
//아이디 중복확인
export const idReduplicationApi = async (id: string) => {
    const res = await api.post('/id_reduplication',
        { id }
    );

    const data = await res.data;
    return data;
};

//이메일 중복확인 및 인증번호 발송
export const sendEmailApi = async (email: string) => {
    const res = await api.post('/send_authentication', 
        { email }
    );

    const data = await res.data;
    return data;
};

//인증번호 확인
export const authCodeReduplicationApi = async (email: string, authCode: string) => {
    const res = await api.post('/check_authentication',
        { email, authCode }
    );

    const data = await res.data;
    return data;
};


//회원가입
export const memberResisterApi = async (
    id: string, 
    password: string,
    name: string,
    phoneNumber: string,
    email: string,
    birth: string
) => {
    const res = await api.post('/join_member',
        { 
            id,
            password,
            name,
            phoneNumber,
            email,
            birth
        }
    );

    const data = await res.data;
    return data;
};

//************************* 아이디 찾기 및 패스워드 재 설정
export const findIdApi = async (email: string) => {
    const res = await api.post('/find_id',
        { email }
    );

    const data = await res.data;
    return data;
};
