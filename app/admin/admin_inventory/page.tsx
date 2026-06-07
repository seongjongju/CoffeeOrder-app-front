import React from 'react';
import './_styled/admin_inventory.css';
import InventoryInterface from './_components/InventoryInterface';

const AdminInventoryPage = () => {
    return (
        <main className='main admin-main'>
            <h2 className='admin-title'>재고관리</h2>

            <InventoryInterface />
        </main>
    );
};

export default AdminInventoryPage;