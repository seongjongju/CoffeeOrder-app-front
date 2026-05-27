'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, Suspense, useState } from 'react';
import { Provider } from "react-redux";
import { persistor, store } from "../store/store";
import OptionProvider from './globalProvider/OptionProvider';
import LoadingUi from '@/shared/components/loading/LoadingUi'; 
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppBar from '@/shared/components/appBar/AppBar';
import MainAppBar from '@/shared/components/appBar/MainAppBar';

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

    const isIntroPage = pathName === '/client/intro';

    if (isIntroPage) {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
        );
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <PersistGate loading={<LoadingUi />} persistor={persistor}>
                    {/* <OptionProvider /> */}
                    {children}
                </PersistGate>
            </Provider>
        </QueryClientProvider>
    );
};

export default ClientLayout;