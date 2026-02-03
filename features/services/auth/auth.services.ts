import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

export const authApi = {
    isLogout: async () => {
        const { data } = await api.post('/api/users/logout',
            {},
        );

        return data;
    },
};