import Image from 'next/image';
import mascot from '@/public/images/mascot.png';
import React from 'react';

const CartItemNone = () => {
    return (
        <div className='cart-null__ui'>
            <Image src={mascot} alt='마스코트' />
            <p className='cart-null__text'>장바구니가 비었어요!!</p>
        </div>
    );
};

export default CartItemNone;