import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

export const signUpApi = {
    //아이디 검사
    checkingId: async (id: string) => {
        const {data} = await api.get('/api/users/check-id', 
            {params: {id}},
        )

        return data;
    },

    //이메일 검사
    checkingEmail: async (email: string) => {
        const {data} = await api.get('/api/users/check-email', 
            {params: {email}}
        )

        return data;
    },

    certificationEmail: async (email: string) => {
        const {data} = await api.post('/api/users/mail', 
            {email}
        )

        return data;
    },

    //인증번호
    checkingCertificationNumber: async (email: string, certificationNumber: string) => {
        const {data} = await api.post('/api/users/certification-check',
            {
                email,
                certificationNumber
            }
        )

        return data;
    },
};

