import React from 'react';
import '@/shared/client/styled/order/order.css';
import OrderView from '../_components/OrderView';
import { orderGetApi } from '@/features/adminApi/adminOrderApi';

const AdminOrdersViewPage = async ({ params }: {params : Promise<{ orderId: string; }>}) => {
    const {orderId} = await params;
    const allOrders = await orderGetApi(); //주문 내역

    return (
        <main className='order-main' style={{padding: "20px 0"}}>
            <nav className='inner'>
                <OrderView 
                    orders={allOrders.result}
                    params={orderId}
                />
            </nav>
        </main>
    );
};

export default AdminOrdersViewPage;