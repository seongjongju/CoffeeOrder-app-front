'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, Suspense } from 'react';
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MainAppBar from '@/shared/components/appbar/MainAppBar';
import AppBar from '@/shared/components/appbar/AppBar';
import OptionProvider from './globalProvider/OptionProvider';
import LoadingUi from '@/shared/components/loading/LoadingUi'; 
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

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

    const isIntroPage = pathName === '/';

    if (isIntroPage) {
        return <>{children}</>;
    }
    
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Suspense fallback={<LoadingUi />}>
                    <OptionProvider />
                    <PersistGate persistor={persistor} />
                    { 
                        pathName === '/login' ||
                        pathName === '/policy' ||
                        pathName === '/signUp' ||
                        pathName === '/userFind/idFind' ||
                        pathName === '/userFind/idFindResult' ||
                        pathName === '/userFind/passwordFind'
                        ? <AppBar /> 
                        : pathName === '/signUpFinish' || 
                        pathName === '/' ||
                        pathName === '/orderFinish'
                        ? null : <MainAppBar />  
                    }
                    {children}
                </Suspense>
            </Provider>
        </QueryClientProvider>
    );
};

export default ClientLayout;