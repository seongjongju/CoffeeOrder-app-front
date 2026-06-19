'use client';
import Image from 'next/image';
import plusIco from '@/public/icons/view_plus.svg';
import minusIco from '@/public/icons/view_minus.svg';
import React, { useState } from 'react';
import useOptions from '@/features/hooks/view/useOptions';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { addToCart } from '@/store/cart/cartSlice';
import useModalShow from '@/features/hooks/modal/useModalShow';
import Modal from '@/shared/client/components/modal/Modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { addToAlert } from '@/store/alert/alertSlice';
import { ProductGetType } from '@/app/types/products/product';
import { QuantityOption } from './VIewInterface';

interface OptionProps {
    viewProduct: {
        price: string;
    };
    optionArray: Array<QuantityOption>;
}

const OrderBar = ({viewProduct, optionArray }: OptionProps) => {
    console.log(viewProduct)

    /* const { lightly, shot, syrup, whipping, price, count } = useAppSelector(state => state.option); */
    //옵션 선택 커스텀 훅
   /*  const {
        countIncrement,
        countDecrement,
    } = useOptions();
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.auth); */

    //모달창
    const {modalShow, setModalShow, modalText, setModalText} = useModalShow();

    //가격
    /* const OPTION_PRICE = 500;

    const optionPrice = (shot + syrup + whipping) * OPTION_PRICE;

    const totalPrice = (price + optionPrice) * count; */

    //장바구니로 이동
    /* const handleClickCartMoving = (e:React.MouseEvent<HTMLButtonElement>) => {
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
    }; */

    //결제
    /* const handleSinglePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
    }; */

    return (
        <div className='order-bar'>
            {
                optionArray !== undefined ? (
                    <div className='order-bar__options'>
                        {
                            optionArray.map((op) => {
                                    if(op.count === 0 && !op.lightly) return;
                                    return(
                                        <p 
                                            key={op.id}
                                            className='order-bar__option'
                                        >
                                            {
                                                op.id === "lightly" && op.lightly ? "연하게" :
                                                op.id === "shot" && op.count > 0 ? `샷 추가 x ${op.count}` :
                                                op.id === "syrup" && op.count > 0 ? `시럽 추가 x ${op.count}` :
                                                op.id === "whipping" && op.count > 0 ? `휘핑크림 추가 x ${op.count}` :
                                                null
                                            }
                                        </p>
                                    )
                                }
                            )
                        }
                    </div>
                ) : null
            }
            
            <form className='order-bar__form'>
                <div className='view-option'>
                    <p className='order-bar__price'>
                        Total : {viewProduct.price}원
                    </p>
                    <div className='view-option__quantity-wrap'>
                        <button 
                            className='view-option__button'
                            /* onClick={countDecrement} */
                        >
                            <Image src={minusIco} alt='마이너스버튼' />
                        </button>
                        <input 
                            className='view-option__input'
                            type="number" 
                            /* value={count} */
                            readOnly
                        />
                        <button 
                            className='view-option__button'
                            /* onClick={countIncrement} */
                        >
                            <Image src={plusIco} alt='플러스버튼' />
                        </button>
                    </div> {/* view-option__quantity-wrap */}
                </div> {/* view-option */}
                <div className='order-bar__btns'>
                    <button 
                        className='order-bar__button--cart'
                    >
                        장바구니
                    </button>
                    <button 
                        className='order-bar__button--order'
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