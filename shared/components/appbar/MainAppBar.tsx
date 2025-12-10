'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { AppBarTitle, BackButton, HeaderNav, HeaderUtil, SideGnbDim } from '@/shared/styled/GlobalStyled';
import logo from '@/public/images/logo.svg';
import cart from '@/public/images/cart.svg';
import alert from '@/public/images/alert.svg';
import menu from '@/public/images/menu.svg';
import CategorySideGnb from '../sideGnb/CategorySideGnb';
import BackIco from '@/public/icons/back_ico.png';
import { usePathname, useRouter } from 'next/navigation';
import useAppBarTitles from './hook/useAppBarTitles';

const MainAppBar = () => {
    const [categorySideOn, setCategorySideOn] = useState<boolean>(false);
    const {appBarTitles} = useAppBarTitles();
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
            <HeaderNav>
                {
                    pathName !== '/main' ? 
                    <BackButton
                        onClick={() => router.back()}
                    >
                        <Image src={BackIco} alt='뒤로가기' />
                    </BackButton> : 
                    <Link href={'/main'} >
                        <Image  src={logo} alt='로고' />
                    </Link>
                }

                {
                    pathName !== '/main' ? 
                    <AppBarTitle>{appBarTitles()}</AppBarTitle> : 
                    null
                }

                <HeaderUtil>
                    <Link href={''}>
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
                </HeaderUtil>
            </HeaderNav>
                        
            {
                categorySideOn ? <SideGnbDim /> : null
            }
            <CategorySideGnb 
                categorySideOn={categorySideOn}
                setCategorySideOn={setCategorySideOn}
            />
        </header>
    );
};

export default MainAppBar;