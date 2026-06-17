'use client';
import InventoryRegiModal from './InventoryRegiModal';
import React, { useState } from 'react';
import { categorys } from '@/app/util/admin/category';
import useAdminModal from '@/features/hooks/admin/modal/useAdminModal';

const InventoryInterface = ({ children }: { children: React.ReactNode }) => {
    const {setModalToggle, modalToggle} = useAdminModal(); //모달창 토글 커스텀 훅
    const [invenName, setInvenName] = useState<string>(""); //재고 명
    const [invenCate, setInvenCate] = useState<string>(""); //카테고리
    const [invenQuantity, setInvenQuantity] = useState<string>("0"); //재고 수량

    return (
        <div>
            <form className='admin-form'>
                <button 
                    className='admin-form__regi'
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        setModalToggle("inven-regi");
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
                modalToggle === "inven-regi" &&
                (
                    <InventoryRegiModal 
                        setModalToggle={setModalToggle}
                        modalToggle={modalToggle}
                        setInvenName={setInvenName}
                        invenName={invenName}
                        setInvenCate={setInvenCate}
                        invenCate={invenCate}
                        setInvenQuantity={setInvenQuantity}
                        invenQuantity={invenQuantity}
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
                {children}
            </div>
        </div>
    );
};

export default InventoryInterface;