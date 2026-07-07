import React from 'react';

const CouponList = () => {
    return (
        <div className='coupon'>
            <button className='coupon__btn'>
                선택
            </button>
            <ul className='coupon__list'>
                <li className='coupon__li'>- 1,000원 할인</li>
                <li className='coupon__li'>- 1,000원 할인</li>
            </ul>
        </div>
    );
};

export default CouponList;