'use client';
import InventoryRegiModal from './InventoryRegiModal';
import React, { useState } from 'react';
import { categorys } from '@/app/util/admin/category';
import useAdminModal from '@/features/hooks/admin/modal/useAdminModal';
import { useRouter } from 'next/navigation';
import InventoryList from '@/shared/admin/components/list/InventoryList';
import { Inventory } from '@/app/types/inventorys/inventory';

export interface InventoryProps {
    inventorys: Inventory['inventorys'];
    params?: string;
};

const InventoryInterface = ({inventorys, params}:InventoryProps) => {
    const router = useRouter();
    const {setModalToggle, modalToggle} = useAdminModal(); //모달창 토글 커스텀 훅
    const [invenName, setInvenName] = useState<string>(""); //재고 명
    const [invenCate, setInvenCate] = useState<string>(""); //카테고리
    const [invenQuantity, setInvenQuantity] = useState<string>("0"); //재고 수량
    const [search, setSearch] = useState<string>(""); //검색용 상태관리

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
                <select 
                    className='admin-form__select'
                    value={params}
                    onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                        setSearch("");

                        if(e.target.value === "") {
                            router.push(`/admin/admin_inventory`);
                            return;
                        }

                        router.push(`/admin/admin_inventory?cate=${e.target.value}`);
                    }}
                >
                    <option value="">전체</option>
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
                        placeholder='재고명을 입력하세요.'
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
                                router.push(`/admin/admin_inventory`);
                                return;
                            }

                            //카테고리가 undefined이면 cate쿼리 스트링 없이 전체에서 검색
                            if(params === undefined) {
                                router.push(`/admin/admin_inventory?q=${search}`);
                                return;
                            }

                            router.push(`/admin/admin_inventory?cate=${params}&q=${search}`);
                        }}
                    >
                        검색
                    </button>
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
                <InventoryList 
                    inventorys={inventorys}
                    params={params}
                />
            </div>
        </div>
    );
};

export default InventoryInterface;