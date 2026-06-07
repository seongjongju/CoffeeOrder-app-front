'use client'
import React from 'react';
import { usePathname } from 'next/navigation'

const InventoryUpdateBtn = () => {
    const pathname = usePathname()
    if (pathname === '/admin/admin_main') return null;
    return (
        <button
            className='inventory-form__regi'
            style={{
                height: "30px",
                padding: "3px 10px",
                fontSize: "11px"
            }}
        >
            재고 수정
        </button>
    );
};

export default InventoryUpdateBtn;