'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import logo from '@/public/images/logo.svg';
import cart from '@/public/images/cart.svg';
import alert from '@/public/images/alert.svg';
import menu from '@/public/images/menu.svg';
import CategorySideGnb from '../sideGnb/CategorySideGnb';
import BackIco from '@/public/icons/back_ico.png';
import { usePathname, useRouter } from 'next/navigation';
import '@/shared/styled/appBar/appBar.css';
import '@/shared/styled/cart/cart.css';
import useAppBarTitles from './hook/useAppBarTitles';
import useCartQuantity from '@/features/cart/hook/useCartQuantity';

const MainAppBar = () => {
    const [categorySideOn, setCategorySideOn] = useState<boolean>(false);
    const {appBarTitles} = useAppBarTitles();
    const {cartItemQuantity} = useCartQuantity(); // 전체 count, 수량 커스텀 훅
    const pathName = usePathname();
    const router = useRouter();

    return (
        <header style={{
            position: 'fixed',
            width: '100%',
            maxWidth: '600px',
            zIndex: 99,
            backgroundColor: '#fff',
        }}>
            <nav className='header-nav'>
                {
                    pathName !== '/main' ? 
                    <button
                        className='back-button'
                        onClick={() => router.back()}
                    >
                        <Image src={BackIco} alt='뒤로가기' />
                    </button> : 
                    <Link href={'/main'} >
                        <Image  src={logo} alt='로고' />
                    </Link>
                }

                {
                    pathName !== '/main' ? 
                    <h2 className='app-bar-title'>{appBarTitles()}</h2> : 
                    null
                }

                <div className='header-util'>
                    <Link href={'/cart'} style={{ position: "relative" }}>
                        <span className='quantity'>{cartItemQuantity}</span>
                        <Image src={cart} alt='장바구니' />
                    </Link>
                    <button>
                        <Image src={alert} alt='알림' />
                    </button>
                    <button
                        onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            setCategorySideOn(true);
                        }}
                    >
                        <Image src={menu} alt='메뉴'/>
                    </button>
                </div>
            </nav>
                        
            {
                categorySideOn ? <div className='dim'></div> : null
            }
            <CategorySideGnb 
                categorySideOn={categorySideOn}
                setCategorySideOn={setCategorySideOn}
            />
        </header>
    );
};

export default MainAppBar;