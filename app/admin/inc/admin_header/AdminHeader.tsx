'use client';
import React from 'react';
import "../_styled/admin_inc.css";
import Link from 'next/link';
import AdminLnb from '../admin_lnb/AdminLnb';
import { adminLogoutApi } from '@/features/adminApi/adminAuthApi';
import { usePathname, useRouter } from 'next/navigation';

const AdminHeader = () => {
    const router = useRouter(); 
    const pathName = usePathname();

    const adminLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try{
            const data = await adminLogoutApi();
            alert(`${data.message}`);
            router.push('/admin/admin_login');

            return;
        } catch(err:any) {
            console.error(err.response?.data?.message);
            alert(`${err.response?.data?.message}`);
            return;
        }
    };

    //관리자 로그인 페이지에서는 헤더 UI를 보여주지 않음
    //주문내역 상세보기 페이지에서는 헤더 UI를 보여주지 않음
    if(pathName.includes('/admin/admin_orders_view')) return null;
    else if (pathName.includes('/admin/admin_login')) return null;

    return (
        <>
            <header id='admin-header'>
                <nav className='admin-header__nav'>
                    <Link 
                        target='_blank' 
                        href={"/client/intro"}
                        className='admin-header__link'
                    >
                        <img 
                            src="/images/mascot.png" alt="로고"
                            className='admin-header__logo'
                        />
                        앱 이동
                    </Link>
                    <button 
                        className='admin-header__logout'
                        onClick={adminLogout}
                    >
                        관리자<br />
                        로그아웃
                    </button>
                </nav>
            </header>

            <AdminLnb />
        </>
    );
};

export default AdminHeader;