'use client';
import AppBar from '@/shared/components/AppBar';
import NavigationBar from '@/shared/components/NavigationBar';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

const ClientLayout = ({children}:{ children: React.ReactNode }) => {
    const pathName = usePathname();

    const appBarTitles = () => {
        if(pathName === '/policy') return '이용약관';
        if(pathName === '/signUp') return '회원가입';
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
            {pathName !== '/' && pathName !== '/signUpFinish' ? <AppBar appBarTitle={appBarTitles()}/> : null}
            {children}
            {pathName !== '/' && <NavigationBar />}
        </>
    );
};

export default ClientLayout;