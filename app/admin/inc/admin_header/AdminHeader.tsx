import React from 'react';
import "../_styled/admin_inc.css";
import Link from 'next/link';
import AdminLnb from '../admin_lnb/AdminLnb';

const AdminHeader = () => {
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
                    <button className='admin-header__logout'>
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