'use client';
import React from 'react';
import '@/shared/styled/mypage/mypage.css';
import logo from '@/public/images/logo.svg';
import linkArrow from '@/public/icons/mypage_link_arrow.png';
import Image from 'next/image';
import { useAppSelector } from '@/features/login/store/hooks';
import Link from 'next/link';

const Mypage = () => {
    const auth = useAppSelector(state => state.auth);

    return (
        <main className='main'>
            <section className='section'>
                <div className='mypage-user'>
                    <Image src={logo} alt='로고' />
                    <p className='mypage-name'>{auth.user?.name} 님</p>
                </div>
                <div className='inner'>
                    <Link
                        className='mypage-link'
                        href={'/userFind/passwordFind'}
                    >
                        비밀번호 변경
                        <Image src={linkArrow} alt="링크 이동 화살표" />
                    </Link>
                    <button
                        className='mypage-link'
                    >
                        로그아웃
                        <Image src={linkArrow} alt="링크 이동 화살표" />
                    </button>
                </div>
            </section>
        </main>
    );
};

export default Mypage;