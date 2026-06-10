import React from 'react';
import InventoryRegister from './InventoryRegister';
import { inventoryGetApi } from '@/features/adminApi/adminInventoryApi';
import InventoryList from '@/shared/admin/components/list/InventoryList';

const InventoryInterface = async () => {
    const allInventory = await inventoryGetApi();

    return (          
        <InventoryRegister>
            <InventoryList 
                inventorys={allInventory.inventorys}
            />
        </InventoryRegister>
    );
};

export default InventoryInterface;