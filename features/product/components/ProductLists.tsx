import React from 'react';
import productStyles from '../product.module.css';
import ProductItems from './ProductItems';

const ProductLists = () => {
    return (
        <div className={productStyles.product_list}>
            <ProductItems />
            <ProductItems />
        </div>
    );
};

export default ProductLists;