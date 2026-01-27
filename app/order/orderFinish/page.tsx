'use client';
import Button from '@/shared/components/button/Button';
import '@/shared/styled/order/order.css';
import Image from 'next/image';
import mascot from '@/public/images/mascot.png';
import { useRouter } from 'next/navigation';
import React from 'react';

const OrderFinishPage = () => {
    const router = useRouter();

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
                    onClick={() => router.push('/main')}
                />
            </div>
        </div>
    );
};

export default OrderFinishPage;