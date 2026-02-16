'use client';
import '@/shared/styled/view/view.css';
import Image from 'next/image';
import plusIco from '@/public/icons/view_plus.svg';
import minusIco from '@/public/icons/view_minus.svg';
import React from 'react';
import useOptions from '@/features/hooks/view/useOptions';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { addToCart } from '@/store/cart/cartSlice';
import useModalShow from '@/features/hooks/modal/useModalShow';
import Modal from '@/shared/components/modal/Modal';
import * as PortOne from "@portone/browser-sdk/v2";
import { addToAlert } from '@/store/alert/alertSlice';

interface optionType {
    menuName: string;
    img: string;
    menuId: number;
}

const OrderBar = ({ menuName, img, menuId }: optionType) => {
    const { lightly, shot, syrup, whipping, price, count } = useAppSelector(state => state.option);
    const { countIncrement, countDecrement } = useOptions();
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.auth);

    const { modalShow, setModalShow, modalText, setModalText } = useModalShow();

    const OPTION_PRICE = 500;
    const optionPrice = (shot + syrup + whipping) * OPTION_PRICE;
    const totalPrice = (price + optionPrice) * count;

    const handleClickCartMoving = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(addToCart({
            lightly, shot, syrup, whipping, price, count, img, menuName
        }));
        setModalText('장바구니에 추가되었습니다.');
        setModalShow(true);
    };

    // 결제 로직 수정됨
    const handleSinglePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
        const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY;

        if (!storeId || !channelKey) {
            alert("결제 설정이 누락되었습니다.");
            return;
        }

        const paymentId = `order_${Date.now()}`;

        // 1. 포트원 결제창 호출 (검증 로직은 웹훅이 처리하므로 호출만 하면 끝)
        await PortOne.requestPayment({
            storeId,
            channelKey,
            paymentId,
            orderName: count > 1 ? `${menuName} ${count}개` : menuName,
            totalAmount: totalPrice,
            currency: "CURRENCY_KRW",
            redirectUrl: `${window.location.origin}/order/orderFinish`,
            payMethod: "EASY_PAY",
            customer: {
                customerId: users.user?.id,
                fullName: users.user?.name,
                email: users.user?.email
            },
            // [중요] 백엔드 웹훅에서 사용할 수 있게 주문 정보를 실어 보냄
            customData: {
                userId: users.user?.id,
                items: [
                    {
                        productId: menuId,
                        name: menuName,
                        quantity: count,
                        price: price + optionPrice,
                        img: img,
                        options: { lightly, shot, syrup, whipping }
                    }
                ]
            }
        });

        const Today = new Date().toISOString();
        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}.${String(date.getHours()).padStart(2, '0')}.${String(date.getMinutes()).padStart(2, '0')}`;
        };

        dispatch(addToAlert({
            alertId: formatDate(Today),
            menuName: menuName
        }));
    };

    return (
        <div className='order-bar'>
            {(shot !== 0 || syrup !== 0 || whipping !== 0 || lightly) && (
                <div className='order-bar__options'>
                    {lightly && <p className='order-bar__option'>연하게</p>}
                    {shot !== 0 && <p className='order-bar__option'>샷 추가 X <span>{shot}</span></p>}
                    {syrup !== 0 && <p className='order-bar__option'>시럽 추가 X <span>{syrup}</span></p>}
                    {whipping !== 0 && <p className='order-bar__option'>휘핑크림 추가 X <span>{whipping}</span></p>}
                </div>
            )}
            
            <form className='order-bar__form'>
                <div className='view-option'>
                    <p className='order-bar__price'>Total : {totalPrice.toLocaleString()}원</p>
                    <div className='view-option__quantity-wrap'>
                        <button type="button" className='view-option__button' onClick={countIncrement}>
                            <Image src={plusIco} alt='플러스버튼' />
                        </button>
                        <input className='view-option__input' type="number" value={count} readOnly />
                        <button type="button" className='view-option__button' onClick={countDecrement}>
                            <Image src={minusIco} alt='마이너스버튼' />
                        </button>
                    </div>
                </div>
                <div className='order-bar__btns'>
                    <button type="button" className='order-bar__button--cart' onClick={handleClickCartMoving}>장바구니</button>
                    <button type="button" className='order-bar__button--order' onClick={handleSinglePayment}>주문하기</button>
                </div>
            </form>

            {modalShow && (
                <Modal 
                    modalText={modalText} 
                    modalShow={modalShow} 
                    setModalText={setModalText} 
                    setModalShow={setModalShow} 
                />
            )}
        </div>
    );
};

export default OrderBar;