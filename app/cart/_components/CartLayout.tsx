'use client';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { allDeleteCart } from '@/store/cart/cartSlice';
import useCartQuantity from '@/features/hooks/cart/useCartQuantity';
import mascot from '@/public/images/mascot.png';
import axios from 'axios';
import CartList from './CartList';
import Image from 'next/image';
import { addToAlert } from '@/store/alert/alertSlice';

export type TotalPriceType = {
    price: number,
    shot: number,
    syrup: number,
    whipping: number,
    count: number,
};

export type CartItemType = {
    cartId: string;
    menuName: string;
    price: number;
    count: number;
    shot: number;
    syrup: number;
    whipping: number;
    lightly: boolean;
    img: string;
};

const CartLayout = () => {
    const { cartItems, cartTotalCount } = useCartQuantity();
    const users = useAppSelector(state => state.auth);

    const OPTION_PRICE = 500;

    // 개별 아이템 가격 계산 함수
    const calculateItemPrice = ({ price, shot, syrup, whipping, count }: TotalPriceType) => {
        const optionPrice = (shot + syrup + whipping) * OPTION_PRICE;
        return (price + optionPrice) * count;
    };

    // 장바구니 전체 총액 계산
    const totalCartAmount = cartItems.items.reduce((acc, item) => {
        return acc + calculateItemPrice({
            price: item.price,
            shot: item.shot,
            syrup: item.syrup,
            whipping: item.whipping,
            count: item.count
        });
    }, 0);

    // 결제 핸들러 
    const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const createRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create`, {
                userId: users.user?.id,
                items: cartItems.items.map(item => ({
                    menuId: item.cartId,
                    menuName: item.menuName,
                    img: item.img,
                    price: item.price,
                    count: item.count,
                    options: { lightly: item.lightly, shot: item.shot, syrup: item.syrup, whipping: item.whipping }
                }))
            });

            const { orderId, amount } = createRes.data;

            if (typeof window !== "undefined") {
                const pay_obj: any = window;
                const { AUTHNICE } = pay_obj;
                AUTHNICE.requestPay({
                    clientId: process.env.NEXT_PUBLIC_NICEPAY_CLIENT_ID,
                    method: 'card',
                    orderId,
                    amount,
                    goodsName: cartItems.items.map(item => item.menuName),
                    returnUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/payment/nice-approve`,
                    fnError: (result: any) => {
                        alert('고객용메시지 : ' + result.errorMsg + '\n개발자확인용 : ' + result.msg);
                    }
                });
            }

            localStorage.setItem('isFromCart', 'true');
        } catch (error: any) {
            console.error(error.response?.data?.message);
        }
    };

    return (
        <main className={cartItems.items.length !== 0 ? 'main cart-main' : 'main cart-null'}>
            <div className='inner cart-inner'>
                <CartList 
                    items={cartItems.items}
                    calculateItemPrice={calculateItemPrice}
                />
                <button 
                    className='common-button' 
                    style={{ marginTop: "10px" }}
                    onClick={handlePayment}
                >
                    주문하기 <span className='totla-length'>총 {cartTotalCount}개 | {totalCartAmount.toLocaleString()}원</span>
                </button>
            </div>

            {cartItems.items.length === 0 && (
                <div className='cart-null__ui'>
                    <Image src={mascot} alt='마스코트' />
                    <p className='cart-null__text'>장바구니가 비었어요!!</p>
                </div>
            )}
        </main>
    );
};

export default CartLayout;