'use client';
import { meApi } from '@/features/clientApi/authApi';
import { loginSuccess } from '@/store/auth/authSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const userInfo = async () => {
            try{
                const data = await meApi();
                dispatch(loginSuccess(data));
                return;
            } catch(err: any) {
                console.error("유저 정보 로드 실패:", err);
                return;
            }
        };

        userInfo();
    }, [dispatch]);

    return (
        <>
            {children}
        </>
    );
};

export default AuthProvider;