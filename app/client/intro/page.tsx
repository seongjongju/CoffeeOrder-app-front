'use client';
import Image from 'next/image';
import Link from 'next/link';
import BigMascot from '@/public/icons/big_mascot.png';
import "./_styled/intro.css";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hook';

const IntroPage = () => {
    const router = useRouter();
    const auth = useAppSelector(state => state.auth);

    useEffect(() => {
        if(auth.isLoggedIn) {
            setTimeout(() => {
                router.push('/client/');
            }, 2000);
        }
    },[auth.isLoggedIn]);

    return (
        <div className='intro-container'>
            <Image className='intro-image' src={BigMascot} alt='머그컵 캐릭터' />
            {
                !auth.isLoggedIn ? (
                    <div className='intro-buttons'>
                        <Link className='intro-link' href={'/client/auth/policy'} >가입하기</Link>
                        <Link className='intro-link' href={'/client/auth/login'} >로그인</Link>
                    </div>
                ) : null
            }
        </div>
    );
};

export default IntroPage;