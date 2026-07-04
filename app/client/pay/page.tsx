import React from 'react';
import '@/shared/client/styled/order/order.css';
import PayInterface from './_components/PayInterface';

const PayPage = () => {
    return (
        <main className='main order-main'>
            <div className='inner'>
                <PayInterface />
            </div>
        </main>
    );
};

export default PayPage;