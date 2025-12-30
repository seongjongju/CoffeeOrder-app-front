'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AuthProvider from './globalProvider/AuthProvider';
import MainAppBar from '@/shared/components/appbar/MainAppBar';
import AppBar from '@/shared/components/appbar/AppBar';
import OptionProvider from './globalProvider/OptionProvider';
import { PersistGate } from 'redux-persist/integration/react';

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
                {/* <AuthProvider /> */}
                <OptionProvider />
                <PersistGate persistor={persistor} />
                { 
                    pathName === '/login' ||
                    pathName === '/policy' ||
                    pathName === '/signUp' ||
                    pathName === '/userFind/idFind' ||
                    pathName === '/userFind/idFindResult'
                    ? <AppBar /> 
                    : pathName === '/signUpFinish' || pathName === '/' 
                    ? null : <MainAppBar />  
                }
                {children}
            </Provider>
        </>
    );
};

export default ClientLayout;