'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, Suspense, useState } from 'react';
import { Provider } from "react-redux";
import { persistor, store } from "../store/store";
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './client/inc/header/Header';
import AdminHeader from './admin/inc/admin_header/AdminHeader';
import LoadingUi from '@/shared/client/components/loading/LoadingUi';

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
    const isAdminPage = pathName.includes("admin");
    const isAdminLoginPage = pathName === '/admin/admin_login';

    if (isIntroPage) {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
        );
    }

    return (
        <Suspense fallback={<LoadingUi />}>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <PersistGate persistor={persistor}>
                        {
                            isAdminLoginPage ? null 
                            : isAdminPage ? <AdminHeader /> 
                            : <Header />
                        }
                        
                        {children}
                    </PersistGate>
                </Provider>
            </QueryClientProvider>
        </Suspense>
    );
};

export default ClientLayout;