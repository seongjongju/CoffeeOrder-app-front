import ProductOrderChart from '@/shared/admin/components/chart/ProductOrderChart';
import Link from 'next/link';
import React from 'react';

const ProductOrderDashBoard = async () => {
    return (
        <div className='dashboard' style={{width: "50%"}}>
            <div className='admin-title-ui'>
                <h3 className='admin-title-ui__title'>제품별 주문 수</h3>
            </div> {/* .admin-title-ui : end */}

            <ProductOrderChart />
        </div>
    );
};

export default ProductOrderDashBoard;