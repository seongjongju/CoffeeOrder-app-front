import React from 'react';
import ProductOrderDashBoard from './_components/ProductOrderDashBoard';

const adminMainPage = () => {
    return (
        <main className='admin-main'>
            <h2 className='admin-title'>대쉬보드</h2>
            <ProductOrderDashBoard />
        </main>
    );
};

export default adminMainPage;