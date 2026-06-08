import React from 'react';
import InventoryRegister from './InventoryRegister';
import { inventoryGetApi } from '@/features/adminApi/adminInventoryApi';

const categorys = [
    {
        id: "cate_0",
        cate: "원두"
    },
    {
        id: "cate_1",
        cate: "우유"
    },
    {
        id: "cate_2",
        cate: "과일"
    },
    {
        id: "cate_3",
        cate: "치즈"
    },
    {
        id: "cate_4",
        cate: "설탕"
    },
    {
        id: "cate_5",
        cate: "시럽"
    },
];

const InventoryInterface = async () => {
    const allInventory = await inventoryGetApi();

    return (
        <div>            
            <InventoryRegister 
                categorys={categorys}
                inventorys={allInventory.inventorys}
            />
        </div>
    );
};

export default InventoryInterface;