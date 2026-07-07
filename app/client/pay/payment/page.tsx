import React from 'react';
import '@/shared/client/styled/order/order.css';
import PayInterface from './_components/PayInterface';

const PaymentPage = () => {
    return (
        <main className='main order-main'>
            <div className='inner'>
                <PayInterface />
            </div>
        </main>
    );
};

export default PaymentPage;