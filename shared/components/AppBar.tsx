'use client';
import React from 'react';
import {AppBarContainer, BackButton, AppBarTitle} from '../styled/GlobalStyled';
import BackIco from '../assets/images/icon/back_ico.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface AppBarProps {
    appBarTitle : string;
};

const AppBar = ({ appBarTitle }:AppBarProps) => {
    const router = useRouter();

    return (
        <AppBarContainer>
            <BackButton
                onClick={() => router.back()}
            >
                <Image src={BackIco} alt='뒤로가기' />
            </BackButton>
            <AppBarTitle>{appBarTitle}</AppBarTitle>
        </AppBarContainer>
    );
};

export default AppBar;