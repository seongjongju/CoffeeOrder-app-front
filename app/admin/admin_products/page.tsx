import React from 'react';
import './_styled/admin_products.css';
import ProductsInterface from './_components/ProductsInterface';

const AdminProductsPage = () => {
    return (
        <main className='main admin-main'>
            <h2 className='admin-title'>제품관리</h2>

            <ProductsInterface />
        </main>
    );
};

export default AdminProductsPage