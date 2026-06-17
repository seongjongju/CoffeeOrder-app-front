'use client';
import React from 'react';
import ProductRegiModal from './ProductRegiModal';
import ProductList from '@/shared/admin/components/list/ProductList';
import { categorys } from '@/app/util/admin/category';
import useAdminModal from '@/features/hooks/admin/modal/useAdminModal';
import { Inventory } from '@/app/types/inventorys/inventory';
import { ProductGetType } from '@/app/types/products/product';

const ProductsInterface = ({inventorys, products}: Inventory & ProductGetType) => {
    const {setModalToggle, modalToggle} = useAdminModal(); //모달창 토글 커스텀 훅

    return (
        <div>
            <form className='admin-form'>
                <button 
                    className='admin-form__regi'
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        setModalToggle("product-regi");
                    }}
                >
                    재고등록
                </button>
                <select className='admin-form__select'>
                    <option value="">카테고리</option>
                    {
                        categorys.map((cate) => (
                            <option value={cate.cate} key={cate.id}>{cate.cate}</option>
                        ))
                    }
                </select>
                <div className='admin-form__write'>
                    <input 
                        type="text" 
                        className='admin-form__input'
                        placeholder='검색어를 입력하세요.'
                    />
                    <button className='admin-form__search'>검색</button>
                </div>
            </form> {/* .admin-form : end */}
            
            {
                modalToggle === "product-regi" &&
                (
                    <ProductRegiModal 
                        setModalToggle={setModalToggle}
                        modalToggle={modalToggle}
                        inventorys={inventorys}
                    />
                )
            }
            <div 
                className='dashboard'
                style={{
                    minHeight: "80vh",
                    position: "relative"
                }}
            >
                <ProductList 
                    products={products}
                    inventorys={inventorys}
                />
            </div>
        </div>
    );
};

export default ProductsInterface;