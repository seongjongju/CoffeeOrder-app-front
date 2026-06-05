import SalesChart from '@/shared/admin/components/chart/SalesChart';
import Link from 'next/link';
import React from 'react';

const SalesDashBoard = () => {
    return (
        <div className='dashboard' style={{width: "50%"}}>
            <div className='admin-title-ui'>
                <h3 className='admin-title-ui__title'>달별 매출</h3>
            </div> {/* .admin-title-ui : end */}

            <SalesChart />
        </div>
    );
};

export default SalesDashBoard;