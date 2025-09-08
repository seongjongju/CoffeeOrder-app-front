'use client';
import AppBar from '@/shared/components/AppBar';
import { usePathname } from 'next/navigation';
import React from 'react';

const ClientLayout = ({children}:{ children: React.ReactNode }) => {
    const pathName = usePathname();

    const appBarTitles = () => {
        if(pathName === '/policy') return '이용약관';
        return '';
    };

    return (
        <>
            {pathName !== '/' && <AppBar appBarTitle={appBarTitles()}/>}
            {children}
        </>
    );
};

export default ClientLayout;