import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

export const orderApi = {
    getOrderHistory: async (userId?: string) => {
        const { data } = await api.get(`/api/myOrder/orderHistory?userId=${userId}`);
        return data;
    },
};