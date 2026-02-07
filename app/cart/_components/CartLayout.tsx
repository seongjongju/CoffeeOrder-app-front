'use client';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { allDeleteCart } from '@/store/cart/cartSlice';
import useCartQuantity from '@/features/hooks/cart/useCartQuantity';
import mascot from '@/public/images/mascot.png';
// 결제 관련 임포트 추가
import * as PortOne from "@portone/browser-sdk/v2";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CartList from './CartList';
import Image from 'next/image';

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

export type CartItemsType = {
    items: CartItemType[];     
};

const CartLayout = () => {
    const { cartItems, cartTotalCount } = useCartQuantity();
    const dispatch = useAppDispatch();
    const router = useRouter();
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

        if (cartItems.items.length === 0) return;

        const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
        const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY;
        const paymentId = `cart_${Date.now()}`;

        // 1. 포트원 결제 요청
        const response = await PortOne.requestPayment({
            storeId: storeId!,
            channelKey: channelKey!,
            paymentId: paymentId,
            orderName: cartItems.items.length > 1 
                ? `${cartItems.items[0].menuName} 외 ${cartItems.items.length - 1}건` 
                : cartItems.items[0].menuName,
            totalAmount: totalCartAmount,
            currency: "CURRENCY_KRW",
            payMethod: "EASY_PAY",
            customer: {
                customerId: users.user?.id,
                fullName: users.user?.name,
                email: users.user?.email
            }
        });

        if (!response || response.code !== undefined) {
            if (response?.message) alert(`결제 실패: ${response.message}`);
            return;
        }

        // 2. 백엔드 검증 및 DB 저장
        try {
            const verifyRes = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify`,
                {
                    paymentId: response.paymentId,
                    totalPrice: totalCartAmount,
                    isCart: true, 
                    items: cartItems.items.map(item => ({
                        productId: item.cartId,
                        name: item.menuName,
                        quantity: item.count,
                        // 개당 단가(기본가 + 옵션가)
                        price: item.price + ((item.shot + item.syrup + item.whipping) * OPTION_PRICE),
                        img: item.img,
                        options: {
                            lightly: item.lightly,
                            shot: item.shot,
                            syrup: item.syrup,
                            whipping: item.whipping
                        }
                    })),
                },
                {
                    withCredentials: true,
                }
            );

            if (verifyRes.status === 200) {
                // 결제 성공 시 Redux 장바구니 비우기
                dispatch(allDeleteCart());
                router.push('/order/orderFinish');
            }
        } catch (error: any) {
            console.error("검증 실패:", error);
            alert("결제 검증 중 오류가 발생했습니다.");
        }
    };

    return (
        <main className={cartItems.items.length !== 0 ? 'main cart-main' : 'main cart-null'}>
            <div className='inner cart-inner'>
                <CartList 
                    items={cartItems.items}
                    calculateItemPrice={calculateItemPrice}
                />
                {/* 주문하기 버튼에 결제 함수 연결 */}
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