import React from 'react';
import Link from 'next/link';
import InventoryList from '@/shared/admin/components/list/InventoryList';
import { inventoryGetApi } from '@/features/adminApi/adminInventoryApi';

const InventoryDashBoard = async () => {
    const allInventory = await inventoryGetApi();

    return (
        <div className='dashboard' style={{
            width: "33.3%", 
            height: "300px",
            overflow: "hidden"
        }}>
            <div className='admin-title-ui'>
                <h3 className='admin-title-ui__title'>재고 현황</h3>
                <Link 
                    href={'/admin/admin_inventory?cate=전체'}
                    className='admin-title-ui__more'
                >
                    전체보기
                </Link>
            </div> {/* .admin-title-ui : end */}

            <InventoryList 
                inventorys={allInventory.inventorys}
            />
        </div>
    );
};

export default InventoryDashBoard;