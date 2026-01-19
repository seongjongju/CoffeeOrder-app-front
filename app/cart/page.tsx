'use client';
import '@/shared/styled/cart/cart.css';
import { useAppDispatch, useAppSelector } from '../store/hook';
import plusIco from '@/public/icons/view_plus.svg';
import minusIco from '@/public/icons/view_minus.svg';
import Image from 'next/image';
import mascot from '@/public/images/mascot.png';
import { allDeleteCart, decrementToCart, delateToCart, incrementToCart } from '@/features/cart/store/cartSlice';
import useLoading from '@/shared/components/loading/hook/useLoading';
import LoadingUi from '@/shared/components/loading/LoadingUi';
import useCartQuantity from '@/features/cart/hook/useCartQuantity';
import React from 'react';
// 결제 관련 임포트 추가
import * as PortOne from "@portone/browser-sdk/v2";
import axios from 'axios';
import { useRouter } from 'next/navigation';

type TotalPriceType = {
    price: number,
    shot: number,
    syrup: number,
    whipping: number,
    count: number
};

const CartPage = () => {
    const { isLoading } = useLoading();
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

    if (isLoading) return <LoadingUi />

    return (
        <main className={cartItems.items.length !== 0 ? 'main cart-main' : 'main cart-null'}>
            <div className='inner cart-inner'>
                <button 
                    className='cart-reset'
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(allDeleteCart())
                    }}
                >
                    장바구니 비우기
                </button>
                <div className='cart'>
                    {cartItems.items.map((item) => (
                        <div key={item.cartId}>  
                            <div className='cart-top'>
                                <p className='cart-name'>{item.menuName}</p>
                                <button 
                                    className='cart-close'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(delateToCart(item.cartId))
                                    }}
                                >
                                    <span></span><span></span>
                                </button>
                            </div>
                            <div className='cart-item'>
                                <div className='cart__image'>
                                    <img src={item.img} alt={item.menuName} />
                                </div>
                                <div className='cart__detail'>
                                    <ul className='cart__list'>
                                        {
                                            item.lightly && 
                                            (
                                                <li className='cart__list--item'><p className='cart__text'>연하게</p></li>
                                            )
                                        }
                                        <li className='cart__list--item'>
                                            <p className='cart__text'>기본가격</p>
                                            <p className='cart__text'>{item.price.toLocaleString()} 원</p>
                                        </li>
                                        {
                                            item.shot !== 0 && 
                                            (
                                                <li className='cart__list--item'>
                                                    <p className='cart__text'>샷 추가</p>
                                                    <p className='cart__text'>{item.shot} X 500원</p>
                                                </li>
                                            )
                                        }
                                        {
                                            item.syrup !== 0 && 
                                            (
                                                <li className='cart__list--item'>
                                                    <p className='cart__text'>시럽 추가</p>
                                                    <p className='cart__text'>{item.syrup} X 500원</p>
                                                </li>
                                            )
                                        }
                                        {
                                            item.whipping !== 0 &&
                                            (
                                                <li className='cart__list--item'>
                                                    <p className='cart__text'>휘핑크림 추가</p>
                                                    <p className='cart__text'>{item.whipping} X 500원</p>
                                                </li>
                                            )
                                        }
                                    </ul>
                                    <div className='cart__count-wrap'>
                                        <div className='cart__quantity-wrap'>
                                            <button className='cart-option__button' onClick={() => dispatch(incrementToCart(item.cartId))}>
                                                <Image src={plusIco} alt='플러스' />
                                            </button>
                                            <input className='cart-option__input' type="number" value={item.count} readOnly />
                                            <button className='cart-option__button' onClick={() => dispatch(decrementToCart(item.cartId))}>
                                                <Image src={minusIco} alt='마이너스' />
                                            </button>
                                        </div>
                                        <p className='cart__total-price'>
                                            {calculateItemPrice(item).toLocaleString()}원
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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

export default CartPage;