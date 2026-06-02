'use client';
import Image from 'next/image';
import BackIco from '@/public/icons/back_ico.png';
import React from 'react';
import "../_styled/inc.css";
import { usePathname, useRouter } from 'next/navigation';
import { getTitle } from '@/app/util/client/get.header.title';

const Header = () => {
    
    const router = useRouter();
    const pathName = usePathname();

    return (
        <header
            className={pathName === "/client/intro" ? "none" : ""}
        >
            <div className='app-bar-container'>
                <button 
                    className='back-button'
                    onClick={() => router.back()}
                >
                    <Image src={BackIco} alt='뒤로가기' />
                </button>
                <h2 className='app-bar-title'>
                    {getTitle(pathName)}
                </h2>
            </div>
        </header>
    );
};

export default Header;