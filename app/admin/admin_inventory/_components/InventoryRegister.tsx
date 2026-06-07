'use client';
import { Category } from '@/app/types/inventorys/inventory';
import InventoryRegiModal from './InventoryRegiModal';
import React, { useState } from 'react';
import InventoryList from '@/shared/admin/components/list/InventoryList';

const InventoryRegister = ({ categorys, inventorys }: Category) => {
    const [inventoryModalShow, setInventoryModalShow] = useState<boolean>(false); //모달창
    const [invenName, setInvenName] = useState<string>(""); //재고 명
    const [invenCate, setInvenCate] = useState<string>(""); //카테고리
    const [invenQuantity, setInvenQuantity] = useState<number>(0); //재고 수량

    return (
        <div>
            <form className='inventory-form'>
                <button 
                    className='inventory-form__regi'
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        setInventoryModalShow(true);
                    }}
                >
                    재고등록
                </button>
                <select className='inventory-form__select'>
                    <option value="">카테고리</option>
                    <option value="">원두</option>
                    <option value="">우유</option>
                    <option value="">과일</option>
                </select>
                <div className='inventory-form__write'>
                    <input 
                        type="text" 
                        className='inventory-form__input'
                        placeholder='검색어를 입력하세요.'
                    />
                    <button className='inventory-form__search'>검색</button>
                </div>
            </form> {/* .inventory-form : end */}

            {
                inventoryModalShow &&
                (
                    <InventoryRegiModal 
                        setInventoryModalShow={setInventoryModalShow}
                        inventoryModalShow={inventoryModalShow}
                        setInvenName={setInvenName}
                        invenName={invenName}
                        categorys={categorys}
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
                    minHeight: "80vh"
                }}
            >
                <InventoryList 
                    inventorys={inventorys}
                />
            </div>
        </div>
    );
};

export default InventoryRegister;