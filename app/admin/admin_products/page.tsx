import React from 'react';
import './_styled/admin_products.css';
import ProductsInterface from './_components/ProductsInterface';
import { inventoryGetApi } from '@/features/adminApi/adminInventoryApi';

const AdminProductsPage = async () => {
    const allInventory = await inventoryGetApi(); //재고
    return (
        <main className='main admin-main'>
            <h2 className='admin-title'>제품관리</h2>

            <ProductsInterface 
                inventorys={allInventory.inventorys}
            />
        </main>
    );
};

export default AdminProductsPage