'use client';
import React, { ReactHTMLElement } from 'react';
import '@/shared/styled/mypage/mypage.css';
import logo from '@/public/images/logo.svg';
import linkArrow from '@/public/icons/mypage_link_arrow.png';
import Image from 'next/image';
import { useAppSelector } from '../store/hook';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Mypage = () => {
    const auth = useAppSelector(state => state.auth);
    const router = useRouter();

    const handleClickLogout = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try{
            const res =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`,
                {},
                {withCredentials: true}
            );

            if(res.status === 200) {
                router.push('/');
            }
        }catch(err) {
            console.error({ message: "로그아웃 서버 오류", error: err });
        };
    };

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
                        onClick={handleClickLogout}
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