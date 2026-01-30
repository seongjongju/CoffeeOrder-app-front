import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

export const userFindApi = {
    //비밀번호 변경을 위한 유저 정보 인증
    certificationUser: async (
        userId:string,
        phoneNumber:string
    ) => {
        const { data } = await api.post('/api/users/findPasswordCertification',
            {
                userId,
                phoneNumber
            }
        )

        return data;
    },
};