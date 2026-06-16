import { inventoryGetApi } from '@/features/adminApi/adminInventoryApi';
import { productGetApi } from '@/features/adminApi/adminProductApi';
import React from 'react';
import ProductView from '../_components/ProductView';

const AdminProductsViewPage = async ({ params  }: {params : Promise<{ PRD: string; }>}) => {
    const { PRD } = await params ; //제품 코드
    if(!PRD) return;
    
    const allProduct = await productGetApi(); //제품

    return (
        <main className='admin-main'>
            <ProductView 
                PRD={PRD}
                products={allProduct.products}
            />
        </main>
    );
};

export default AdminProductsViewPage;