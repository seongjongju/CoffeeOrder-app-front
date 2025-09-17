'use client';
import { loginSuccess, logout } from "@/features/login/store/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthProvider = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const authCheck = async () => {
            try {
                console.log("인증 체크 시작");
                const res = await axios.get("http://localhost:4000/api/users/me", {
                withCredentials: true,
                });
                dispatch(loginSuccess(res.data.user));
            } catch (err) {
                console.log("인증 실패");
                dispatch(logout());
            }
        };

        authCheck();
    }, [dispatch]);

    return null;
};

export default AuthProvider;
