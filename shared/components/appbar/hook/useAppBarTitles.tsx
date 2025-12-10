'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

const useAppBarTitles = () => {
    const pathName = usePathname();

    const appBarTitles = () => {
        if(pathName === '/policy') return '이용약관';
        if(pathName === '/signUp') return '회원가입';
        if(pathName === '/login') return '로그인';
        if(pathName === '/userFind/idFind' || pathName === '/userFind/idFindResult') return '아이디 찾기';
        if(pathName === '/userFind/passwordFind') return '비밀번호 찾기/변경';
        if(pathName === '/mypage') return '마이페이지';
        return '';
    };

    return {appBarTitles}
};

export default useAppBarTitles;