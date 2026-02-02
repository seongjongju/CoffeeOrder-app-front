import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

export const loginActionApi = {
    submitLogin: async (id:string, password:string) => {
        const { data } = await api.post('/api/users/login',
            {
                id,
                password
            }
        )

        return data;
    },
};