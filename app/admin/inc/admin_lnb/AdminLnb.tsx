'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const adminLnbs = [
    {
        id: "0", 
        oneDepth: "HOME",
        href: "/admin/admin_main"
    },
    {
        id: "1", 
        oneDepth: "회원관리 ↓", 
        twoDepths: [
            {
                id: "1_0",
                twoDepth: "회원목록",
                href: "/admin/admin_users"
            },
            {
                id: "1_1",
                twoDepth: "회원 주문/결제 내역",
                href: "/admin/admin_orders"
            },
        ],
    },
    {
        id: "2", 
        oneDepth: "제품관리", 
        href: "/admin/admin_products",
    },
    {
        id: "3", 
        oneDepth: "재고관리", 
        href: "/admin/admin_inventory",
    },
]

const AdminLnb = () => {
    const [oneDepth, setOneDepth] = useState("");
    const pathName = usePathname();
    const router = useRouter();

    return (
        <div id='admin-lnb'>
            <ul className='admin-lnb__cate'>
                {
                    adminLnbs.map((lnb) => (
                        <li 
                            key={lnb.id}
                            className='admin-lnb__li'
                        >
                            <button 
                                className={`admin-lnb__onedepth ${
                                    lnb?.href ? 
                                    (
                                        lnb?.href === pathName ? 'current' : ''
                                    ) :
                                    (
                                        lnb.id === oneDepth ||
                                        lnb.twoDepths?.find(twoDepth => twoDepth.href === pathName) ? 'current' : ''
                                    ) 
                                }`}
                                onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                                    e.preventDefault();
                                    setOneDepth(lnb.id);
                                    !lnb.twoDepths ? router.push(lnb?.href) : null;

                                    if(oneDepth === lnb.id) {
                                        setOneDepth("");
                                    }
                                }}
                            >
                                {lnb.oneDepth}
                            </button>
                            {
                                lnb.twoDepths && 
                                (
                                    <ul className={`admin-lnb__list ${
                                        lnb.id === oneDepth ||
                                        lnb.twoDepths?.find(twoDepth => twoDepth.href === pathName) || 
                                        lnb?.href === pathName ? 'is-active' : ''
                                    }`}>
                                        {
                                            lnb.twoDepths?.map((depth) => (
                                                <li 
                                                    key={depth.id}
                                                    className='admin-lnb__list--li'
                                                >
                                                    <Link 
                                                        href={depth?.href}
                                                        className={`admin-lnb__twodepth ${depth?.href === pathName ? 'is-active' : ''}`}
                                                    >
                                                        {depth?.twoDepth}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default AdminLnb;