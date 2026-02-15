import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const orderApi = {
    getOrderHistory: async () => {
        const { data } = await api.get('/api/myOrder', {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            },
            withCredentials: true,
        });
        return data;
    },
};