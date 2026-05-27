'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

const useAppBarTitles = () => {
    const pathName = usePathname();

    const appBarTitles = () => {
        if(pathName === '/client/auth/policy') return '이용약관';
        if(pathName === '/client/auth/sign_up') return '회원가입';
        if(pathName === '/client/auth/login') return '로그인';
        if(
            pathName === '/client/user_find/id_find' || 
            pathName === '/client/user_find/id_find_success'
        ) return '아이디 찾기';
        if(pathName === '/client/user_find/password_find') return '비밀번호 재설정';
        if(pathName === '/mypage') return '마이페이지';
        if(pathName === '/cart') return '장바구니';
        if(pathName === '/order/orderHistory') return '주문내역';
        return '';
    };

    return {appBarTitles}
};

export default useAppBarTitles;