'use client';
import '@/shared/styled/view/view.css';
import Image from 'next/image';
import plusIco from '@/public/icons/view_plus.svg';
import minusIco from '@/public/icons/view_minus.svg';
import React, { useState } from 'react';
import useOptions from '@/features/hooks/view/useOptions';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { addToCart } from '@/store/cart/cartSlice';
import useModalShow from '@/features/hooks/modal/useModalShow';
import Modal from '@/shared/components/modal/Modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { addToAlert } from '@/store/alert/alertSlice';

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

        try {
            const createResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create`, {
                userId: users.user?.id, 
                items: [{ menuId, menuName, img, price, count, options: { lightly, shot, syrup, whipping } }]
            });

            const { orderId, amount } = createResponse.data;

            if (typeof window !== "undefined") {
                const pay_obj: any = window;
                const { AUTHNICE } = pay_obj;
                console.log("AUTHNICE", AUTHNICE);
                AUTHNICE.requestPay({
                    clientId: process.env.NEXT_PUBLIC_NICEPAY_CLIENT_ID,
                    method: 'card',
                    orderId,
                    amount,
                    goodsName: menuName,
                    returnUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/payment/nice-approve`,
                    fnError: (result: any) => {
                        alert('고객용메시지 : ' + result.errorMsg + '\n개발자확인용 : ' + result.msg);
                    }
                });
            }
        } catch (error: any) {
            console.error(error.response?.data?.message);
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