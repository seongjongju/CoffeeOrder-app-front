'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

const useAppBarTitles = () => {
    const pathName = usePathname();

    const appBarTitles = () => {
        if(pathName === '/policy') return '이용약관';
        if(pathName === '/signUp/signUpForm') return '회원가입';
        if(pathName === '/login') return '로그인';
        if(pathName === '/userFind/idFind' || pathName === '/userFind/idFindResult') return '아이디 찾기';
        if(pathName === '/userFind/passwordFind') return '비밀번호 변경';
        if(pathName === '/mypage') return '마이페이지';
        if(pathName === '/cart') return '장바구니';
        if(pathName === '/order/orderHistory') return '주문내역';
        if(pathName.includes("view/iceCoffee") || pathName.includes("view/hotCoffee")) return '커피';
        if(pathName.includes("view/juice")) return '주스';
        if(pathName.includes("view/dessert")) return '디저트';
        return '';
    };

    return {appBarTitles}
};

export default useAppBarTitles;