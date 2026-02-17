'use client';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { allDeleteCart } from '@/store/cart/cartSlice';
import useCartQuantity from '@/features/hooks/cart/useCartQuantity';
import mascot from '@/public/images/mascot.png';
import * as PortOne from "@portone/browser-sdk/v2";
import axios from 'axios';
import { useRouter } from 'next/navigation';
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
        
        if (!storeId || !channelKey) {
            alert("결제 설정(Store ID / Channel Key)이 누락되었습니다.");
            return;
        }

        const paymentId = `cart_${Date.now()}`;

        // 1. 데이터 가공 (웹훅/검증 공통 데이터)
        const formattedItems = cartItems.items.map(item => ({
            productId: item.cartId, 
            name: item.menuName,
            quantity: item.count,
            price: item.price + ((item.shot + item.syrup + item.whipping) * OPTION_PRICE), // 단가
            img: item.img,
            options: {
                lightly: item.lightly,
                shot: item.shot,
                syrup: item.syrup,
                whipping: item.whipping
            }
        }));

        // 2. 포트원 결제창 호출
        const response = await PortOne.requestPayment({
            storeId: storeId,
            channelKey: channelKey,
            paymentId: paymentId,
            orderName: cartItems.items.length > 1 
                ? `${cartItems.items[0].menuName} 외 ${cartItems.items.length - 1}건` 
                : cartItems.items[0].menuName,
            totalAmount: totalCartAmount,
            currency: "CURRENCY_KRW",
            redirectUrl: `${window.location.origin}/order/orderFinish`,
            payMethod: "EASY_PAY",
            customer: {
                customerId: users.user?.id,
                fullName: users.user?.name,
                email: users.user?.email
            },
            // 중요: 이 데이터가 있어야 백엔드 웹훅이 모바일에서도 DB를 저장함
            customData: {
                userId: users.user?.id,
                items: formattedItems
            }
        });

        // 결제 실패 처리
        if (!response || response.code !== undefined) {
            if (response?.message) alert(`결제 실패: ${response.message}`);
            return;
        }

        // 3. 백엔드 결제 검증 및 DB 저장
        try {
            const verifyRes = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify`,
                {
                    paymentId: response.paymentId,
                    totalPrice: totalCartAmount,
                    isCart: true, 
                    items: formattedItems, 
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            // 성공 시 알림 및 페이지 이동
            const Today = new Date().toISOString();
            const formatDate = (dateString: string) => {
                const date = new Date(dateString);
                return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}.${String(date.getHours()).padStart(2, '0')}.${String(date.getMinutes()).padStart(2, '0')}`;
            };

            dispatch(addToAlert({
                alertId: formatDate(Today),
                menuName: cartItems.items.length > 1 
                    ? `${cartItems.items[0].menuName} 외 ${cartItems.items.length - 1}건` 
                    : cartItems.items[0].menuName
            }));

            if (verifyRes.status === 200) {
                dispatch(allDeleteCart());
                router.push('/order/orderFinish');
            }
        } catch (error: any) {
            console.error("검증 실패:", error.response?.data || error.message);
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