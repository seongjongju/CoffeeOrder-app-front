'use client';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/images/logo.svg';
import linkArrow from '@/public/icons/mypage_link_arrow.png';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import useModalShow from '@/features/hooks/modal/useModalShow';
import Modal from '@/shared/components/modal/Modal';
/* import { authApi } from '@/features/services/auth/auth.services'; */
import { logout } from '@/store/auth/authSlice';
import { allDeleteCart } from '@/store/cart/cartSlice';

const MypageUi = () => {
    const {modalShow, setModalShow, modalText, setModalText} = useModalShow();
    const auth = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();

    /* const handleClickLogout = async () => {
        try{
            const data = await authApi.isLogout();

            dispatch(logout());
            dispatch(allDeleteCart());

            setModalText(data.message);
            setModalShow(true);
        } catch(error: any) {
            console.error(error.response?.data?.message);
            setModalText("로그아웃 서버 오류");
            setModalShow(true);
        }
    };
 */
    return (
        <>
            <div className='mypage-user'>
                <Image src={logo} alt='로고' />
                <p className='mypage-name'>{auth.user?.name} 님</p>
            </div>
            <div className='inner'>
                <Link
                    className='mypage-link'
                    href={'/userFind/passwordFind'}
                >
                    비밀번호 재설정
                    <Image src={linkArrow} alt="링크 이동 화살표" />
                </Link>
                <button
                    className='mypage-link'
                    /* onClick={handleClickLogout} */
                >
                    로그아웃
                    <Image src={linkArrow} alt="링크 이동 화살표" />
                </button>
            </div>

            {
                modalShow && 
                <Modal 
                    modalShow={modalShow}
                    setModalShow={setModalShow}
                    modalText={modalText}
                    setModalText={setModalText}
                />
            }
        </>
    );
};

export default MypageUi;