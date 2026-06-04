'use client';
import React from 'react';
import '@/shared/styled/appBar/appBar.css';
import BackIco from '@/public/icons/back_ico.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useAppBarTitles from '../../../../features/hooks/appBar/useAppBarTitles';

const AppBar = () => {
    const {appBarTitles} = useAppBarTitles();
    const router = useRouter();

    return (    
        <header
            style={{
                position: "sticky",
                top: 0,
                left: 0,
                width: "100%",
            }}
        >
            <div className='app-bar-container'>
                <button 
                    className='back-button'
                    onClick={() => router.back()}
                >
                    <Image src={BackIco} alt='뒤로가기' />
                </button>
                <h2 className='app-bar-title'>{appBarTitles()}</h2>
            </div>
        </header>
    );
};

export default AppBar;