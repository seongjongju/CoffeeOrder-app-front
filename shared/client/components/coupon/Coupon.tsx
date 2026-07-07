'use client';
import React from 'react';
import '../../styled/coupon/coupon.css';
import CouponList from './CouponList';

const Coupon = () => {
    return (
        <>
            <p className='coupon-title'>사용 가능한 쿠폰 0개</p>
            <CouponList />
        </>
    );
};

export default Coupon;