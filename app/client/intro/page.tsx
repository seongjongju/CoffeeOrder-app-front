'use client';
import Image from 'next/image';
import Link from 'next/link';
import BigMascot from '@/public/icons/big_mascot.png';
import "./_styled/intro.css";
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const IntroPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    //리다이렉트 처리
    useEffect(() => {
        const error = searchParams.get('error');
        if(error === 'token_expired') {   
            router.replace('/client/intro');
            return;
        } 
    }, []);
    
    return (
        <div className='intro-container'>
            <Image className='intro-image' src={BigMascot} alt='머그컵 캐릭터' />
            <div className='intro-buttons'>
                <Link className='intro-link' href={'/client/auth/policy'} >가입하기</Link>
                <Link className='intro-link' href={'/client/auth/login'} >로그인</Link>
            </div> 
        </div>
    );
};

export default IntroPage;