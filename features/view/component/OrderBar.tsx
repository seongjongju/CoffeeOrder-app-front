import '@/shared/styled/view/view.css';
import React from 'react';

const OrderBar = () => {
    return (
        <div className='order-bar'>
            <div className='order-bar__options'>
                <p className='order-bar__option'>
                    샷 추가 X <span>1</span>
                </p>
                <p className='order-bar__option'>
                    샷 추가 X <span>1</span>
                </p>
            </div> {/* order-bar__options */}
        </div>
    );
};

export default OrderBar;