'use client';
import Image from 'next/image';
import Link from 'next/link';
import BigMascot from '@/public/icons/big_mascot.png';
import "./_styled/intro.css";
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/store/hook';

const IntroPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const auth = useAppSelector(state => state.auth);

    //리다이렉트 처리
    useEffect(() => {
        const error = searchParams.get('error');
        if(error === 'login_required') {
            alert('로그인이 필요합니다.');   
            router.replace('/client/intro');
            return;
        }
    }, []);
    
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