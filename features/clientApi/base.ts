import axios from "axios";

export const api = axios.create({
    baseURL: '/api',
    withCredentials: true
});

export const api_1 = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_FRONT_API_URL}/api`,
    withCredentials: true
});