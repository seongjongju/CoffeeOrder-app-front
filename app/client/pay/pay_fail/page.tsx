'use client';
import '../_styled/pay.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const PayFailPage = () => {
    const searchParams = useSearchParams();
    const message = searchParams.get('message');

    return (
        <div className='pay-main'>
            <nav className='inner'>
                <div className='pay-message'>
                    <p className='pay-message__text'>{message}</p>
                    <Link href={'/'} className='pay-message__link'>홈으로 이동</Link>
                </div>
            </nav>
        </div>
    );
};

export default PayFailPage