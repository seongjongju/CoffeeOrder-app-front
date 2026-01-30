import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

export const userFindActionApi = {
    //아이디 찾기 
    submitFindId: async (email: string) => {
        const { data } = await api.post('/api/users/findId',
            {email}
        )

        return data;
    },

    //비밀번호 변경
    changedPassword: async (
        userId:string,
        newPassword:string
    ) => {
        const { data } = await api.post('/api/users/changePassword', 
            {
                userId,
                newPassword
            }
        )

        return data;
    },
};