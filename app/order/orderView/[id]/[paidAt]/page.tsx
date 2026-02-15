import React from 'react';
import '@/shared/styled/order/order.css';
import OrderViewLayout from '../../_components/OrderViewLayout';
import { cookies } from 'next/headers';
import { orderApi } from '@/features/services/order/order.services';

const OrderViewPage = async () => {
    const cookieStore = await cookies();
    const orderHistory = await orderApi.getOrderHistory(cookieStore);

    return (
        <OrderViewLayout orderHistory={orderHistory} />
    );
};

export default OrderViewPage;