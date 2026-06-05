import React from 'react';
import Link from 'next/link';
import InventoryList from '@/shared/admin/components/list/InventoryList';

const InventoryDashBoard = () => {
    return (
        <div className='dashboard' style={{
            width: "33.3%", 
            height: "300px",
            overflow: "hidden"
        }}>
            <div className='admin-title-ui'>
                <h3 className='admin-title-ui__title'>재고 현황</h3>
                <Link 
                    href={'/admin/admin_products'}
                    className='admin-title-ui__more'
                >
                    전체보기
                </Link>
            </div> {/* .admin-title-ui : end */}

            <InventoryList />
        </div>
    );
};

export default InventoryDashBoard;