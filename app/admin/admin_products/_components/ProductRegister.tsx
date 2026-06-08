'use client';
import React, { useState } from 'react';
import ProductRegiModal from './ProductRegiModal';
import ProductList from '@/shared/admin/components/list/ProductList';

const ProductRegister = () => {
    const [productModalShow, setProductModalShow] = useState<boolean>(false);
    return (
        <div>
            <form className='product-form'>
                <button 
                    className='product-form__regi'
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        setProductModalShow(true);
                    }}
                >
                    제품등록
                </button>
                <select className='product-form__select'>
                    <option value="">카테고리</option>
                    <option value="">커피</option>
                    <option value="">에이드</option>
                    <option value="">디저트</option>
                </select>
                <div className='product-form__write'>
                    <input 
                        type="text" 
                        className='product-form__input'
                        placeholder='검색어를 입력하세요.'
                    />
                    <button className='product-form__search'>검색</button>
                </div>
            </form> {/* .product-form : end */}
            
            {
                productModalShow &&
                (
                    <ProductRegiModal 
                        setProductModalShow={setProductModalShow}
                        productModalShow={productModalShow}
                    />
                )
            }

            <ProductList />
        </div>
    );
};

export default ProductRegister;