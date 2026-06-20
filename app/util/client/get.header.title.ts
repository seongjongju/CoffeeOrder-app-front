import { ReadonlyURLSearchParams } from "next/navigation";

export const getTitle = (path: string, searchParams: ReadonlyURLSearchParams) => {
    if(path === '/client/auth/policy') return '이용약관';
    if(path === '/client/auth/sign_up') return '회원가입';
    if(path === '/client/auth/login') return '로그인';
    if(
        path === '/client/user_find/id_find' || 
        path === '/client/user_find/id_find_result'
    ) return '아이디 찾기';
    if(path === '/client/user_find/password_find') return '비밀번호 재설정';
    if(path === '/mypage') return '마이페이지';
    if(path === '/client/cart') return '장바구니';
    if(path === '/order/orderHistory') return '주문내역';
    if(searchParams.get('category')) return searchParams.get('category');
    return '';
};