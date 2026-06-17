'use client';
import { categorys } from '@/app/util/admin/category';
import { formatNumber } from '@/app/util/format';
import { inventoryRegiApi } from '@/features/adminApi/adminInventoryApi';
import { useRouter } from 'next/navigation';
import React, { Dispatch, memo, SetStateAction } from 'react';

interface ModalProps {
    setModalToggle: Dispatch<SetStateAction<string>>;
    modalToggle: string;
    setInvenName: Dispatch<SetStateAction<string>>;
    invenName: string;
    setInvenCate: Dispatch<SetStateAction<string>>;
    invenCate: string;
    setInvenQuantity: Dispatch<SetStateAction<string>>;
    invenQuantity: string;
};

const InventoryRegiModal = memo(({ 
    setModalToggle, 
    modalToggle,
    setInvenName,
    invenName,
    setInvenCate,
    invenCate,
    setInvenQuantity,
    invenQuantity,
}: ModalProps) => {
    const router = useRouter();

    console.log(invenQuantity)

    const handleInvenSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(invenName.trim() === "" || invenCate === "") {
            alert("값을 모두 입력해주세요.");
            return;
        }

        if(Number(invenQuantity) === 0) {
            alert("수량은 1개 이상 필수 입니다.");
            return;
        }

        if(Number(invenQuantity.replaceAll(',', '')) > 100) {
            alert("수량은 100개가 최대입니다.");
            return;
        }

        try{
            const data = await inventoryRegiApi(
                invenName.trim(),
                invenCate,
                invenQuantity
            );

            if(!data.success) {
                alert(`${data.message}`);
                return;
            }

            //초기값으로 되돌린다.
            setInvenName("");
            setInvenCate("");
            setInvenQuantity("0");

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
                onClick={() => {
                    setModalToggle("");
                    setInvenQuantity("0");
                }}
            ></div>
            <div 
                className='admin-modal'
                style={{
                    display: `${modalToggle === "inven-regi" ? "block" : "none"}`
                }}
            >                
                <div className='admin-modal__write'> 
                    <label htmlFor="" className='admin-modal__label'>
                        재고명<span style={{color: "#ff0000"}}>*</span>
                    </label>
                    <input 
                        type="text" 
                        className='admin-modal__input'
                        placeholder='재고명을 입력하세요.'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setInvenName(e.target.value);
                        }}
                    />
                </div> {/* .admin-modal__write : end */}

                <div className='admin-modal__write'> 
                    <label htmlFor="" className='admin-modal__label'>
                        카테고리<span style={{color: "#ff0000"}}>*</span>
                    </label>
                    <select 
                        className='admin-modal__select'
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setInvenCate(e.target.value);
                        }}
                    >
                        <option value="">카테고리</option>
                        {
                            categorys.map((cate) => (
                                <option value={cate.cate} key={cate.id}>{cate.cate}</option>
                            ))
                        }
                    </select> {/* .admin-modal__select : end */}
                </div> {/* .admin-modal__write : end */}

                <div className='admin-modal__write'> 
                    <label htmlFor="" className='admin-modal__label'>
                        재고수량<span style={{color: "#ff0000"}}>*</span>
                    </label>
                    <input 
                        type="text" 
                        className='admin-modal__number'
                        value={invenQuantity}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setInvenQuantity(formatNumber(e.target.value));
                        }}
                    />
                </div> {/* .admin-modal__write : end */}

                <button 
                    className='admin-modal__button'
                    onClick={handleInvenSubmit}
                >
                    등록하기
                </button>
            </div> {/* .admin-modal : end */}
        </>
    );
});

export default InventoryRegiModal;