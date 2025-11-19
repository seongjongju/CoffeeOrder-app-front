'use client';
import { loginSuccess, logout } from "@/features/login/store/authSlice";
import { useAppSelector } from "@/features/login/store/hooks";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthProvider = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);


    useEffect(() => {
        const authCheck = async () => {
            try {
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
    }, [dispatch, isLoggedIn]);

    return null;
};

export default AuthProvider;
