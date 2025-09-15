'use client';
import AppBar from '@/shared/components/AppBar';
import NavigationBar from '@/shared/components/NavigationBar';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { Provider } from "react-redux";
import { store } from "@/features/login/store/store";

const ClientLayout = ({children}:{ children: React.ReactNode }) => {
    const pathName = usePathname();

    const appBarTitles = () => {
        if(pathName === '/policy') return '이용약관';
        if(pathName === '/signUp') return '회원가입';
        if(pathName === '/login') return '로그인';
        return '';
    };

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('서비스 워커 등록 성공', reg))
                .catch(err => console.log('서비스 워커 등록 실패', err));
            });
        }
    }, []);

    return (
        <>
            <Provider store={store}>
                {pathName !== '/' && pathName !== '/signUpFinish' ? <AppBar appBarTitle={appBarTitles()}/> : null}
                {children}
                {pathName !== '/' && <NavigationBar />}
            </Provider>
        </>
    );
};

export default ClientLayout;