'use client';
import React from 'react';
import '@/shared/styled/appBar/appBar.css';
import BackIco from '@/public/icons/back_ico.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useAppBarTitles from '../../../features/appBar/hook/useAppBarTitles';

const AppBar = () => {
    const {appBarTitles} = useAppBarTitles();
    const router = useRouter();

    return (
        <div className='app-bar-container'>
            <button 
                className='back-button'
                onClick={() => router.back()}
            >
                <Image src={BackIco} alt='뒤로가기' />
            </button>
            <h2 className='app-bar-title'>{appBarTitles()}</h2>
        </div>
    );
};

export default AppBar;