import React from 'react';
import InventoryRegister from './InventoryRegister';
import { inventoryGetApi } from '@/features/adminApi/adminInventoryApi';

const categorys = [
    {
        id: "원두",
        cate: "원두"
    },
    {
        id: "우유",
        cate: "우유"
    },
    {
        id: "과일",
        cate: "과일"
    },
    {
        id: "치즈",
        cate: "치즈"
    },
    {
        id: "설탕",
        cate: "설탕"
    },
    {
        id: "시럽",
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