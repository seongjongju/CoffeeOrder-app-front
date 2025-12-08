'use client';
import React from 'react';
import {AppBarContainer, BackButton, AppBarTitle} from '../styled/GlobalStyled';
import BackIco from '@/public/icons/back_ico.png';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const AppBar = () => {
    const pathName = usePathname();
    const router = useRouter();

    const appBarTitles = () => {
        if(pathName === '/policy') return '이용약관';
        if(pathName === '/signUp') return '회원가입';
        if(pathName === '/login') return '로그인';
        if(pathName === '/userFind/idFind' || pathName === '/userFind/idFindResult') return '아이디 찾기';
        if(pathName === '/userFind/passwordFind') return '비밀번호 찾기/변경';
        return '';
    };

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