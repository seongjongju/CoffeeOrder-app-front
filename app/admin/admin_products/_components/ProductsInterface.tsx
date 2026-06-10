import React from 'react';
import ProductRegister from './ProductRegister';
import { inventoryGetApi } from '@/features/adminApi/adminInventoryApi';


const ProductsInterface = async () => {
    const allInventory = await inventoryGetApi(); //재고

    return (
        <ProductRegister 
            inventorys={allInventory.inventorys}
        />
    );
};

export default ProductsInterface;