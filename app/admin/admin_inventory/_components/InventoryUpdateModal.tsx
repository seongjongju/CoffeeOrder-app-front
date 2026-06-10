'use client';
import { Inventory } from '@/app/types/inventorys/inventory';
import { categorys } from '@/app/util/admin/category';
import { inventoryUpdateApi } from '@/features/adminApi/adminInventoryApi';
import { useRouter } from 'next/navigation';
import React, { Dispatch, memo, SetStateAction, useState } from 'react';

interface UpdateProps {
    inventorys: Inventory['inventorys'];
    setModalToggle: Dispatch<SetStateAction<string>>;
    modalToggle: string;
    invenId: string;
}

const InventoryUpdateModal = memo(({
    inventorys,
    setModalToggle,
    modalToggle,
    invenId,
}: UpdateProps) => {
    const [objName, setObjName] = useState(inventorys.find(iv => iv._id === invenId)?.inventoryName);
    const [objCategory, setObjCategory] = useState(inventorys.find(iv => iv._id === invenId)?.category);
    const [objQuantity, setObjQuantity] = useState(inventorys.find(iv => iv._id === invenId)?.quantity);

    const router = useRouter();

    const handleInvenUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(!objName || !objCategory || !objQuantity) return;

        if(objName.trim() === "" || objCategory === "") {
            alert("값을 모두 입력해주세요.");
            return;
        }

        if(objQuantity === 0) {
            alert("수량은 1개 이상 필수 입니다.");
            return;
        }

        if(objQuantity > 100) {
            alert("수량은 100개가 최대입니다.");
            return;
        }

        try{
            const data = await inventoryUpdateApi(
                invenId,
                objName.trim(),
                objCategory,
                objQuantity
            );

            if(!data.success) {
                alert(`${data.message}`);
                return;
            }

            //모달창 종료
            alert(`${data.message}`);
            setModalToggle("");
            router.refresh();
            return;
        }catch(err: any) {
            console.error(err.response?.data?.message);
            alert(`${err.response?.data?.message}`);
            return;
        }
    };

    return (
        <>
            <div 
                className='dim'
                onClick={() => setModalToggle("")}
            ></div>
            <div 
                className='admin-modal'
                style={{
                    display: `${modalToggle === "inven-update" ? "block" : "none"}`
                }}
            >                
                <div className='admin-modal__write'> 
                    <label htmlFor="" className='admin-modal__label'>재고명</label>
                    <input 
                        type="text" 
                        value={objName}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setObjName(e.target.value);
                        }}
                        className='admin-modal__input'
                        placeholder='재고명을 입력하세요.'
                    />
                </div> {/* .admin-modal__write : end */}

                <div className='admin-modal__write'> 
                    <label htmlFor="" className='admin-modal__label'>카테고리</label>
                    <select 
                        className='admin-modal__select'
                        value={objCategory}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setObjCategory(e.target.value);
                        }}
                    >
                        {
                            categorys.map((cate) => (
                                <option value={cate.cate} key={cate.id}>{cate.cate}</option>
                            ))
                        }
                    </select> {/* .admin-modal__select : end */}
                </div> {/* .admin-modal__write : end */}

                <div className='admin-modal__write'> 
                    <label htmlFor="" className='admin-modal__label'>재고수량</label>
                    <input 
                        type="number" 
                        min={0}
                        max={100}
                        value={objQuantity}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setObjQuantity(Number(e.target.value));
                        }}
                        className='admin-modal__number'
                    />
                </div> {/* .admin-modal__write : end */}

                <button 
                    className='admin-modal__button'
                    onClick={handleInvenUpdate}
                >
                    수정하기
                </button>
            </div> {/* .admin-modal : end */}
        </>
    );
});

export default InventoryUpdateModal;