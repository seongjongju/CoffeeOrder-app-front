import React from 'react';
import '@/shared/client/styled/order/order.css';
import PayInterface from './_components/PayInterface';
import { payGetApi } from '@/features/clientApi/payApy';

const PaymentPage = async ({ searchParams }: {searchParams: Promise<{ orderId: string }>}) => {
    const {orderId} = await searchParams; 
    const paymentData = await payGetApi(orderId);

    return (
        <main className='main order-main'>
            <nav className='inner'>
                <PayInterface 
                    paymentData={paymentData.data}
                />
            </nav>
        </main>
    );
};

export default PaymentPage;