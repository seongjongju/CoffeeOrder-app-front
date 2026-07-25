import React from 'react';
import Link from 'next/link';
import LatelyOrderList from '@/shared/admin/components/list/LatelyOrderList';
import OrdersList from '@/shared/admin/components/list/OrdersList';
import { orderGetApi } from '@/features/adminApi/adminOrderApi';

const LatelyOrderDashBoard = async () => {
    const allOrders = await orderGetApi(); //주문 내역

    return (
        <div className='dashboard' style={{
            width: "33.3%", 
            height: "300px",
            overflow: "hidden"
        }}>
            <div className='admin-title-ui'>
                <h3 className='admin-title-ui__title'>최근 주문</h3>
                <Link 
                    href={'/admin/admin_orders'}
                    className='admin-title-ui__more'
                >
                    전체보기
                </Link>
            </div> {/* .admin-title-ui : end */}

            <OrdersList 
                orders={allOrders.result}
            />
        </div>
    );
};

export default LatelyOrderDashBoard;