import { OrdersProps } from '@/app/types/orders/orders';
import { orderGetApi } from '@/features/adminApi/adminOrderApi';
import SalesChart from '@/shared/admin/components/chart/SalesChart';
import Link from 'next/link';
import React from 'react';

const SalesDashBoard = async () => {
    const allOrders = await orderGetApi(); //주문 내역

    return (
        <div className='dashboard' style={{width: "50%"}}>
            <SalesChart 
                orders={allOrders.result}
            />
        </div>
    );
};

export default SalesDashBoard;