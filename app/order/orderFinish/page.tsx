'use client';
import Button from '@/shared/components/button/Button';
import '@/shared/styled/order/order.css';
import Image from 'next/image';
import mascot from '@/public/images/mascot.png';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { addToAlert } from '@/store/alert/alertSlice';
import { orderApi } from '@/features/services/order/order.services';
import { allDeleteCart } from '@/store/cart/cartSlice';

type orderItemObject = {
    menuName: string
}

const OrderFinishPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.auth);

    const orderFinishEvent = async () => {
        if(!users.user?.id) return;

        const data = await orderApi.getOrderHistory(users.user?.id);

        if(!data) {
            console.log("데이터 호출 실패!");
            return;
        }

        const items = data[0].items;
        
        dispatch(addToAlert({
            alertId: Date.now(),
            menuName: items.map((item: orderItemObject) => item.menuName)
        }));

        const isFromCart = localStorage.getItem('isFromCart') === 'true';

        if(isFromCart) {
            dispatch(allDeleteCart());
        }
        
        router.push('/main');
    };

    return (
        <div>
            <div className='order-finish'>
                <Image src={mascot} alt='머그컵 캐릭터' />
                <p className='cart-null__text'>
                    주문이 완료되었습니다!!
                </p>
            </div>
            <div className='next-button-container'>
                <Button 
                    buttonText='확인'
                    onClick={orderFinishEvent}
                />
            </div>
        </div>
    );
};

export default OrderFinishPage;