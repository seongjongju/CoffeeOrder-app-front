import React from 'react';
import productStyles from '@/features/product/product.module.css';

const ProductNavigationBar = () => {
    return (
        <div className={productStyles.order_navigation_bar}>
            <p className={productStyles.price}>4,500원</p>
            <ul>
                <li className={productStyles.options_list_item}>샷추가 - 1</li>
            </ul>
            <div className={productStyles.order_btn_wrap}>
                <button className={productStyles.cart_btn}>
                    장바구니
                </button>
                <button className={productStyles.order_btn}>
                    주문하기
                </button>
            </div>
        </div>
    );
};

export default ProductNavigationBar;