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

export const authCodeReduplicationApi = async (email: string, authCode: string) => {
    const res = await api.post('/check_authentication',
        { email, authCode }
    );

    const data = await res.data;
    return data;
};
