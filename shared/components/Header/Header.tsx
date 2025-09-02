'use client';

import React from 'react';
import headerStyles from './Header.module.css';
import Image from "next/image";
import Link from 'next/link';
import bellIco from '../../assets/images/ico/bell.svg';
import cartIco from '../../assets/images/ico/cart.svg';
import logo from '../../assets/images/common/logo.svg';
import backIco from '../../assets/images/ico/back_arrow.svg';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
    const pathName = usePathname();
    const router = useRouter();

    const headerPagesNavigation = () => {
        if(pathName === '/login') return '로그인';
        if(pathName === '/signUpPolicy' || pathName === '/signUp') return '회원가입';
        if(pathName === '/orderHistory') return '주문 내역';
        if(pathName === '/couponBox') return '쿠폰함';
        if(pathName === '/notice' || pathName === '/noticeView') return '공지사항';
        if(pathName === '/alarm') return '알림';
        if(pathName === '/cart') return '장바구니';
    };

    return (
        <header id={headerStyles.header}>
            <nav className={headerStyles.header_nav}>

                <h1 className={headerStyles.logo}>
                    {   
                        pathName === '/' || pathName === '/seeMore' ? (
                            <Link href={'/'} >
                                <Image src={logo} priority alt="로고" />
                            </Link>
                        ) : (
                            <button 
                                type='button'
                                onClick={() => router.back()}
                            >
                                <Image src={backIco} priority alt='뒤로가기' style={{ width: '24px' }} />
                            </button>
                        )
                    }
                </h1>
                {
                    <h2 className={headerStyles.header_title}>{headerPagesNavigation()}</h2>
                }
                <div className={headerStyles.header_utils}>
                    <Link href={'/alarm'}>
                        <Image src={bellIco} priority alt="알림 페이지" />
                    </Link>
                    <Link href={'/cart'}>
                        <Image src={cartIco} priority alt="장바구니" />
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;