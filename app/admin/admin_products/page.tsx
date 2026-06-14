import React from 'react';
import './_styled/admin_products.css';
import ProductsInterface from './_components/ProductsInterface';
import { inventoryGetApi } from '@/features/adminApi/adminInventoryApi';
import { productGetApi } from '@/features/adminApi/adminProductApi';

const AdminProductsPage = async () => {
    const allInventory = await inventoryGetApi(); //재고
    const allProduct = await productGetApi(); //제품

    return (
        <main className='main admin-main'>
            <h2 className='admin-title'>제품관리</h2>

            <ProductsInterface 
                inventorys={allInventory.inventorys}
                products={allProduct.products}
            />
        </main>
    );
};

export default AdminProductsPage