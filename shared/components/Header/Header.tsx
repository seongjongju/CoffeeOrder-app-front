import React from 'react';
import styles from './Header.module.css';
import Image from "next/image";
import Link from 'next/link';
import bellIco from '../../assets/images/ico/bell.svg';
import cartIco from '../../assets/images/ico/cart.svg';
import logo from '../../assets/images/common/logo.svg';

const Header = () => {
    return (
        <header id={styles.header}>
            <nav className={styles.header_nav}>
                <h1 className={styles.logo}>
                    <Link href={'/'} >
                        <Image src={logo} priority alt="로고" />
                    </Link>
                </h1>
                <div className={styles.header_utils}>
                    <Link href={''}>
                        <Image src={bellIco} priority alt="알림 페이지" />
                    </Link>
                    <Link href={''}>
                        <Image src={cartIco} priority alt="장바구니" />
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;