'use client';
import React, { useState } from 'react';
import ProductRegiModal from './ProductRegiModal';
import ProductList from '@/shared/admin/components/list/ProductList';
import { productCategory } from '@/app/util/admin/category';
import useAdminModal from '@/features/hooks/admin/modal/useAdminModal';
import { Inventory } from '@/app/types/inventorys/inventory';
import { ProductGetType } from '@/app/types/products/product';
import { useRouter } from 'next/navigation';

export interface ProductProps {
    inventorys: Inventory['inventorys'];
    products: ProductGetType['products'];
    params: string;
};

const ProductsInterface = ({inventorys, products, params}: ProductProps) => {
    const router = useRouter();
    const {setModalToggle, modalToggle} = useAdminModal(); //모달창 토글 커스텀 훅
    const [search, setSearch] = useState<string>(""); //검색용 상태관리

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
                    제품등록
                </button>
                <select 
                    className='admin-form__select'
                    onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                        setSearch("");

                        if(e.target.value === "") {
                            router.push(`/admin/admin_products`);
                            return;
                        }

                        router.push(`/admin/admin_products?cate=${e.target.value}`);
                    }}
                >
                    <option value="">전체</option>
                    {
                        productCategory.map((cate) => (
                            <option value={cate.cate} key={cate.id}>{cate.cate}</option>
                        ))
                    }
                </select>
                <div className='admin-form__write'>
                    <input 
                        type="text" 
                        className='admin-form__input'
                        placeholder='제품명을 입력하세요.'
                        value={search}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setSearch(e.target.value);
                        }}
                    />
                    <button 
                        className='admin-form__search'
                        onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            //검색어가 없으면 전체 보여주기
                            if(search.trim() === "") {
                                router.push(`/admin/admin_products`);
                                return;
                            }

                            //카테고리가 undefined이면 cate쿼리 스트링 없이 전체에서 검색
                            if(params === undefined) {
                                router.push(`/admin/admin_products?q=${search}`);
                                return;
                            }

                            router.push(`/admin/admin_products?cate=${params}&q=${search}`);
                        }}
                    >
                        검색
                    </button>
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
                    params={params}
                />
            </div>
        </div>
    );
};

export default ProductsInterface;