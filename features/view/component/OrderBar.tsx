'use client';
import '@/shared/styled/view/view.css';
import Image from 'next/image';
import plusIco from '@/public/icons/view_plus.svg';
import minusIco from '@/public/icons/view_minus.svg';
import React, { useState } from 'react';
import useOptions from '../hook/useOptions';
import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import { addToCart } from '@/features/cart/store/cartSlice';
import useModalShow from '@/features/modal/hook/useModalShow';
import Modal from '@/shared/components/modal/Modal';
import useCartQuantity from '@/features/cart/hook/useCartQuantity';
import axios from 'axios';
import * as PortOne from "@portone/browser-sdk/v2";
import { useRouter } from 'next/navigation';

interface optionType {
    menuName: string;
    img: string;
    menuId: Number;
}

const OrderBar = ({ menuName, img, menuId }: optionType) => {
    const { lightly, shot, syrup, whipping, price, count } = useAppSelector(state => state.option);
    //옵션 선택 커스텀 훅
    const {
        countIncrement,
        countDecrement,
    } = useOptions();
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.auth);
    const router = useRouter();

    //모달창
    const {modalShow, setModalShow, modalText, setModalText} = useModalShow();

    //가격
    const OPTION_PRICE = 500;

    const optionPrice = (shot + syrup + whipping) * OPTION_PRICE;

    const totalPrice = (price + optionPrice) * count;

    //장바구니로 이동
    const handleClickCartMoving = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        //장바구니에 추가
        dispatch(addToCart({
            lightly: lightly,
            shot: shot,
            syrup: syrup,
            whipping: whipping,
            price: price,
            count: count,
            img: img,
            menuName: menuName
        }));

        setModalText('장바구니에 추가되었습니다.');
        setModalShow(true);
    };

    //결제
    const handleSinglePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
        const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY;

        if (!storeId || !channelKey) {
            alert("결제 설정이 누락되었습니다.");
            return;
        }

        const paymentId = `order_${Date.now()}`;

        // 1. 포트원 결제창 호출
        const response = await PortOne.requestPayment({
            storeId: storeId,
            channelKey: channelKey,
            paymentId: paymentId,
            orderName: count > 1 ? `${menuName} ${count}개` : menuName,
            totalAmount: totalPrice, // 옵션과 수량이 포함된 최종가
            currency: "CURRENCY_KRW",
            payMethod: "EASY_PAY",
            customer: {
                customerId: users.user?.id,
                fullName: users.user?.name,
                email: users.user?.email
            }
        });

        if (!response) return;
        if (response.code !== undefined) {
            alert(`결제 실패: ${response.message}`);
            return;
        }

        // 2. 백엔드 검증 및 DB 저장
        try {
            const verifyRes = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify`,
                {
                    paymentId: response.paymentId,
                    totalPrice: totalPrice, 
                    isCart: false,
                    items: [
                        {
                            productId: menuId, // 상위에서 product 정보를 받아와서 넣어주세요
                            name: menuName,
                            quantity: count, // 선택한 수량 반영
                            price: price + optionPrice, // 옵션이 포함된 개당 단가
                            img: img,
                            options: { // DB에 저장될 상세 옵션 정보
                                lightly,
                                shot,
                                syrup,
                                whipping
                            }
                        },
                    ],
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            if (verifyRes.status === 200) {
                router.push('/order/orderFinish');
            }
        } catch (error: any) {
            console.error("검증 실패:", error.response?.data || error.message);
            alert(error.response?.data?.message || "검증 오류가 발생했습니다.");
        }
    };

    return (
        <div className='order-bar'>
            {
                shot !== 0 || syrup !== 0 || whipping !== 0 || lightly ? (
                    <div className='order-bar__options'>
                        {
                            lightly && 
                            (
                                <p className='order-bar__option'>
                                    연하게
                                </p>
                            )
                        }
                        {
                            shot !== 0 ? 
                            (
                                <p className='order-bar__option'>
                                    샷 추가 X <span>{shot}</span>
                                </p>
                            ) : null
                        }
                        {
                            syrup !== 0 ? 
                            (
                                <p className='order-bar__option'>
                                    시럽 추가 X <span>{syrup}</span>
                                </p>
                            ) : null
                        }
                        {
                            whipping !== 0 ? 
                            (
                                <p className='order-bar__option'>
                                    휘핑크림 추가 X <span>{whipping}</span>
                                </p>
                            ) : null
                        }
                    </div>
                ) : null
            }
            
            <form className='order-bar__form'>
                <div className='view-option'>
                    <p className='order-bar__price'>
                        Total : {totalPrice.toLocaleString()}원
                    </p>
                    <div className='view-option__quantity-wrap'>
                        <button 
                            className='view-option__button'
                            onClick={countIncrement}
                        >
                            <Image src={plusIco} alt='플러스버튼' />
                        </button>
                        <input 
                            className='view-option__input'
                            type="number" 
                            value={count}
                            readOnly
                        />
                        <button 
                            className='view-option__button'
                            onClick={countDecrement}
                        >
                            <Image src={minusIco} alt='마이너스버튼' />
                        </button>
                    </div> {/* view-option__quantity-wrap */}
                </div> {/* view-option */}
                <div className='order-bar__btns'>
                    <button 
                        className='order-bar__button--cart'
                        onClick={handleClickCartMoving}
                    >
                        장바구니
                    </button>
                    <button 
                        className='order-bar__button--order'
                        onClick={handleSinglePayment}
                    >
                        주문하기
                    </button>
                </div> {/* order-bar__btns */}
            </form> {/* order-bar__form */}

            {
                modalShow &&
                <Modal 
                    modalText={modalText}
                    modalShow={modalShow}
                    setModalText={setModalText}
                    setModalShow={setModalShow}
                />
            }
        </div>
    );
};

export default OrderBar;