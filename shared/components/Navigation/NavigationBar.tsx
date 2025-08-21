'use client';

import React from 'react';
import styles from './Navigation.module.css';
import Link from 'next/link';
import Image from 'next/image';
import homeIcoOff from '../../assets/images/ico/home_ico_off.svg';
import homeIcoOn from '../../assets/images/ico/home_ico_on.svg';
import coffeeIco from '../../assets/images/ico/coffee_ico.svg';
import moreIcoOff from '../../assets/images/ico/more_ico_off.svg';
import moreIcoOn from '../../assets/images/ico/more_ico_on.svg';
import { usePathname } from 'next/navigation';

const NavigationBar = () => {
    const pathName = usePathname();

    return (
        <div id={styles.navigation_bar}>
            <nav className={styles.navigation_nav}>
                <Link href={'/'} className={styles.navigation_item}>
                    {
                        pathName === '/' ? <Image src={homeIcoOn} priority alt="홈으로 이동" />
                        :  <Image src={homeIcoOff} priority alt="홈으로 이동" />
                    }
                    <p className={styles.navigation_text}>홈</p>
                </Link>
                <Link href={'/'} className={styles.navigation_item}>
                    <Image src={coffeeIco} priority alt="주문하기" />
                    <p className={styles.navigation_text}>주문</p>
                </Link>
                <Link href={'/seeMore'} className={styles.navigation_item}>
                    {
                        pathName === '/seeMore' ? <Image src={moreIcoOn} priority alt="더보기" />
                        : <Image src={moreIcoOff} priority alt="더보기" /> 
                    }
                    <p className={styles.navigation_text}>더보기</p>
                </Link>
            </nav>
        </div>
    );
};

export default NavigationBar;