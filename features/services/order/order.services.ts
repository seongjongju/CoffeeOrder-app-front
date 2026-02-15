// features/services/order/order.services.ts
import axios from "axios";
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const orderApi = {
    getOrderHistory: async (cookieStore?: ReadonlyRequestCookies) => {
        const headers: Record<string, string> = {};
        
        if (cookieStore) {
            headers.Cookie = cookieStore.toString();
        }

        const { data } = await api.get('/api/myOrder', {
            headers,
            withCredentials: !cookieStore,
        });

        return data;
    },
};