'use client';
import NavigationBar from '@/shared/components/NavigationBar';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { Provider } from "react-redux";
import { store } from "@/features/login/store/store";
import AuthProvider from './globalProvider/AuthProvider';

const ClientLayout = ({children}:{ children: React.ReactNode }) => {
    const pathName = usePathname();

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
                <AuthProvider />
                {children}
                {pathName !== '/' && <NavigationBar />}
            </Provider>
        </>
    );
};

export default ClientLayout;