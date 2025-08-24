import React from 'react';
import productStyles from '@/features/product/product.module.css';

const ProductOptionsWrap = () => {
    return (
        <div className={productStyles.options_wrap}>
            <div>
                <p className={productStyles.options_name}>샷추가</p>
                <p className={productStyles.add_price}>500원+</p>
            </div>
            <div className={productStyles.counter_wrap}>
                <button style={{ lineHeight : '1' }}>+</button>
                <p className={productStyles.counter}>0</p>
                <button>-</button>
            </div>
        </div>
    );
};

export default ProductOptionsWrap;