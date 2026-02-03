'use client';
import { loginSuccess, logout } from "@/store/auth/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthProvider = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
                    withCredentials: true,
                });
                dispatch(loginSuccess(res.data.user));
            } catch (err: any) {
                if (err.response?.status === 401) dispatch(logout());
            } 
        };

        authCheck();
    }, [dispatch]);

    return null;
};

export default AuthProvider;
