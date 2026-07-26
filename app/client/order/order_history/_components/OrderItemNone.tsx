import React from 'react';
import Image from 'next/image';
import mascot from '@/public/images/mascot.png';

const OrderItemNone = () => {
    return (
        <div className='order-null__ui'>
            <Image src={mascot} alt='마스코트' />
            <p className='order-null__text'>주문내역이 비었어요!!</p>
        </div>
    );
};

export default OrderItemNone;