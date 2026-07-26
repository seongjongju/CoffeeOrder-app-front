import React from 'react';
import '@/shared/client/styled/order/order.css';
import OrderHistoryList from './_components/OrderHistoryList';

const OrderHistoryPage = () => {
    return (
        <main className='main order-main'>
            <OrderHistoryList />
        </main>
    );
};

export default OrderHistoryPage;