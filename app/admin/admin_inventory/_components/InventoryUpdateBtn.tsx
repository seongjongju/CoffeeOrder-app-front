'use client'
import React from 'react';
import { usePathname } from 'next/navigation'

const InventoryUpdateBtn = () => {
    const pathname = usePathname()
    if (pathname === '/admin/admin_main') return null;
    return (
        <div>
            <button>수정</button>
            <button>삭제</button>
        </div>
    );
};

export default InventoryUpdateBtn;