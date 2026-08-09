import React from 'react';
import ProductOrderDashBoard from './_components/ProductOrderDashBoard';
import SalesDashBoard from './_components/SalesDashBoard';
import MembersDashBoard from './_components/MembersDashBoard';
import LatelyOrderDashBoard from './_components/LatelyOrderDashBoard';
import InventoryDashBoard from './_components/InventoryDashBoard';

const adminMainPage = () => {
    

    return (
        <main className='admin-main'>
            <h2 className='admin-title'>대쉬보드</h2>
            <div className='dashboard-layout' style={{ marginBottom: "20px" }} >
                <ProductOrderDashBoard />
                <SalesDashBoard />
            </div> {/* .dashboard-layout : end */}

            <div className='dashboard-layout'>
                <MembersDashBoard />
                <LatelyOrderDashBoard />
                <InventoryDashBoard />
            </div> {/* .dashboard-layout : end */}
        </main>
    );
};

export default adminMainPage;