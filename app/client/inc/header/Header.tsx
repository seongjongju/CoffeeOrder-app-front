'use client';
import Image from 'next/image';
import BackIco from '@/public/icons/back_ico.png';
import logo from '@/public/images/logo.svg';
import cart from '@/public/images/cart.svg';
import alert from '@/public/images/alert.svg';
import menu from '@/public/images/menu.svg';
import React, { useState } from 'react';
import "../_styled/inc.css";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getTitle } from '@/app/util/client/get.header.title';
import Link from 'next/link';
import useAlert from '@/features/hooks/alert/useAlert';
import CategorySideGnb from '@/shared/client/components/side/CategorySideGnb';
import SideAlert from '@/shared/client/components/side/SideAlert';
import useCartQuery from '@/features/hooks/query/useCartQuery';
import { useAppSelector } from '@/store/hook';

const Header = () => {
    const [categorySideOn, setCategorySideOn] = useState<boolean>(false); //사이드 gnb (카테고리)
    const [sideAlertOn, setSideAlertOn] = useState<boolean>(false); //사이드 gnb (알림창)
    const {carts} = useCartQuery() // 장바구니 리액트쿼리 커스텀 훅
    const user = useAppSelector(state => state.auth.user); //유저 목록
    const {alertItems} = useAlert();
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const userCarts = user ? carts.filter(cart => cart.userId === user.userId) : undefined; //로그인 된 유저의 장바구니 목록

    return (
        <>
            <header
                className={
                    pathName === "/client/intro" || 
                    pathName === "/client/pay/pay_fail" ||
                    pathName === "/client/pay/pay_success" ? 
                    "none" : ""
                }
            >
                {
                    pathName === "/" ? 
                    (
                        <div 
                            className='app-bar-container'
                            style={{
                                justifyContent: "space-between"
                            }}
                        >
                            <Link href={'/'} >
                                <Image src={logo} alt='로고' />
                            </Link>
                            <div className='header-util'>
                                <Link href={'/client/cart'} style={{ position: "relative" }}>
                                    <span className='quantity'>{userCarts?.length}</span>
                                    <Image src={cart} alt='장바구니' />
                                </Link>
                                <button
                                    style={{ position: "relative" }}
                                    onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                                        e.preventDefault();
                                        setSideAlertOn(true);
                                    }}
                                >
                                    <span 
                                        style={{ background: "#ff0000" }}
                                        className='quantity'
                                    >
                                        {alertItems.length}
                                    </span>
                                    <Image src={alert} alt='알림' />
                                </button>
                                <button
                                    onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                                        e.preventDefault();
                                        setCategorySideOn(true);
                                    }}
                                >
                                    <Image src={menu} alt='메뉴'/>
                                </button>
                            </div>
                        </div>
                    ) : 
                    (
                        <div className='app-bar-container'
                            style={{
                                justifyContent: "space-between"
                            }}
                        >   
                            {
                                pathName.includes('/payment') ? 
                                (
                                    <div></div>
                                ) :
                                (
                                    <button 
                                        className='back-button'
                                        onClick={() => {
                                            if(pathName === '/client/order/order_history') {
                                                router.push('/');
                                            } else {
                                                router.back();
                                            }
                                        }}
                                    >
                                        <Image src={BackIco} alt='뒤로가기' />
                                    </button>
                                )
                            }
                            <h2 className='app-bar-title'>
                                {getTitle(pathName, searchParams)}
                            </h2>
                            {
                                !pathName.includes('/auth') &&
                                !pathName.includes('/user_find') &&
                                !pathName.includes('/payment') ?
                                (
                                    <div className='header-util'>
                                        <Link href={'/client/cart'} style={{ position: "relative" }}>
                                            <span className='quantity'>{userCarts?.length}</span>
                                            <Image src={cart} alt='장바구니' />
                                        </Link>
                                        <button
                                            style={{ position: "relative" }}
                                            onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                                                e.preventDefault();
                                                setSideAlertOn(true);
                                            }}
                                        >
                                            <span 
                                                style={{ background: "#ff0000" }}
                                                className='quantity'
                                            >
                                                {alertItems.length}
                                            </span>
                                            <Image src={alert} alt='알림' />
                                        </button>
                                        <button
                                            onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                                                e.preventDefault();
                                                setCategorySideOn(true);
                                            }}
                                        >
                                            <Image src={menu} alt='메뉴'/>
                                        </button>
                                    </div>
                                ) :
                                null
                            }
                        </div>
                    )
                }
            </header>
            {
                categorySideOn || sideAlertOn ? <div className='dim'></div> : null
            }
            <CategorySideGnb 
                categorySideOn={categorySideOn}
                setCategorySideOn={setCategorySideOn}
            />
            <SideAlert 
                sideAlertOn={sideAlertOn}
                setSideAlertOn={setSideAlertOn}
            />
        </>
    );
};

export default Header;