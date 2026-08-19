import React from 'react';
import OrdersInterface from './_components/OrdersInterface';
import { orderGetApi } from '@/features/adminApi/adminOrderApi';

const AdminOrdersPage = async ({searchParams}: {searchParams: Promise<{cate: string}>}) => {
    const cateSearchParams = await searchParams;
    const {cate} = cateSearchParams;
    const allOrders = await orderGetApi(); //주문 내역

    return (
        <main className='admin-main'>
            <h2 className='admin-title'>회원 주문/결제 내역</h2>

            <OrdersInterface 
                orders={allOrders.result}
                params={cate}
            />
        </main>
    );
};

export default AdminOrdersPage;