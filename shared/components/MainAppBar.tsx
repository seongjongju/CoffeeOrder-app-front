import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HeaderNav, HeaderUtil } from '@/shared/styled/GlobalStyled';
import logo from '@/public/images/logo.svg';
import cart from '@/public/images/cart.svg';
import alert from '@/public/images/alert.svg';
import menu from '@/public/images/menu.svg';

const MainAppBar = () => {
    return (
        <header style={{
            position: 'fixed',
            width: '100%',
            maxWidth: '600px',
            zIndex: 99,
            backgroundColor: '#fff',
        }}>
            <HeaderNav>
                <Link href={'/main'} >
                    <Image  src={logo} alt='로고' />
                </Link>

                <HeaderUtil>
                    <Link href={''}>
                        <Image src={cart} alt='장바구니' />
                    </Link>
                    <button>
                        <Image src={alert} alt='알림' />
                    </button>
                    <button>
                        <Image src={menu} alt='메뉴'/>
                    </button>
                </HeaderUtil>
            </HeaderNav>
        </header>
    );
};

export default MainAppBar;