import React from 'react';
import './_styled/admin_inventory.css';
import InventoryInterface from './_components/InventoryInterface';
import { inventoryGetApi } from '@/features/adminApi/adminInventoryApi';
import InventoryList from '@/shared/admin/components/list/InventoryList';

const AdminInventoryPage = async () => {
    const allInventory = await inventoryGetApi(); //재고
    return (
        <main className='main admin-main'>
            <h2 className='admin-title'>재고관리</h2>

            <InventoryInterface>
                <InventoryList 
                    inventorys={allInventory.inventorys}
                />  
            </InventoryInterface>
        </main>
    );
};

export default AdminInventoryPage;