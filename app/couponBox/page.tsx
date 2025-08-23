import CouponItems from '@/features/couponBox/components/CouponItems';
import React from 'react';

const CouponBoxpage = () => {
    return (
        <main>
            <section>
                <div className='inner'>
                    <h2 className='sub_title'>쿠폰함</h2>
                    <CouponItems />
                    <CouponItems />
                </div> {/* inner */}
            </section>
        </main>
    );
};

export default CouponBoxpage;