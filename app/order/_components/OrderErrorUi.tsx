'use client';
import { useRouter } from 'next/navigation';
import '@/shared/client/styled/order/order.css';
import React from 'react';

interface OrderErrorProps {
    errorExplanation: string;
    errorText: string;
    routerPage: string;
}

const OrderErrorUi = ({errorExplanation, errorText, routerPage}:OrderErrorProps) => {
    const router = useRouter();

    return (
        <main className='main'>
            <div className='inner'>
                <div className='order-error'>
                    <p className='order-error__explanation'>{errorExplanation}</p>
                    <button 
                        className='order-error__button'
                        onClick={() => router.push(routerPage)}
                    >
                        {errorText}
                    </button>
                </div>
            </div>
        </main>
    );
};

export default OrderErrorUi;