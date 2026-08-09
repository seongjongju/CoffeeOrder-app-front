import { orderGetApi } from '@/features/adminApi/adminOrderApi';
import { productGetApi } from '@/features/adminApi/adminProductApi';
import ProductOrderChart from '@/shared/admin/components/chart/ProductOrderChart';
import Link from 'next/link';
import React from 'react';

const ProductOrderDashBoard = async () => {
    const allOrders = await orderGetApi(); //주문 내역
    const allProduct = await productGetApi(); //제품

    return (
        <div className='dashboard' style={{width: "50%"}}>
            <div className='admin-title-ui'>
                <h3 className='admin-title-ui__title'>제품별 주문 수</h3>
            </div> {/* .admin-title-ui : end */}

            <ProductOrderChart
                orders={allOrders.result}
                products={allProduct.products}
            />
        </div>
    );
};

export default ProductOrderDashBoard;