'use client';
import React from 'react';
import {AppBarContainer, BackButton, AppBarTitle} from '../../styled/GlobalStyled';
import BackIco from '@/public/icons/back_ico.png';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import useAppBarTitles from './hook/useAppBarTitles';

const AppBar = () => {
    const {appBarTitles} = useAppBarTitles();
    const router = useRouter();

    return (
        <AppBarContainer>
            <BackButton
                onClick={() => router.back()}
            >
                <Image src={BackIco} alt='뒤로가기' />
            </BackButton>
            <AppBarTitle>{appBarTitles()}</AppBarTitle>
        </AppBarContainer>
    );
};

export default AppBar;