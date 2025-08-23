import React from 'react';
import couponBoxStyles from '../couponBox.module.css';

const CouponItems = () => {
    return (
        <div className={couponBoxStyles.coupon_item}>
            <p className={couponBoxStyles.coupon_text}>1,500원 할인</p>
        </div>
    );
}; 

export default CouponItems;