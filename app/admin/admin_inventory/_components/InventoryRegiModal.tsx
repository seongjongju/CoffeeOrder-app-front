import { inventoryRegiApi } from '@/features/adminApi/adminInventoryApi';
import React, { Dispatch, SetStateAction } from 'react';

interface ModalProps {
    setInventoryModalShow: Dispatch<SetStateAction<boolean>>;
    inventoryModalShow: boolean;
    setInvenName: Dispatch<SetStateAction<string>>;
    invenName: string;
    categorys: Array<{
        id: string;
        cate: string;
    }>;
    setInvenCate: Dispatch<SetStateAction<string>>;
    invenCate: string;
    setInvenQuantity: Dispatch<SetStateAction<number>>;
    invenQuantity: number;
};

const InventoryRegiModal = ({ 
    setInventoryModalShow, 
    inventoryModalShow,
    setInvenName,
    invenName,
    categorys,
    setInvenCate,
    invenCate,
    setInvenQuantity,
    invenQuantity
}: ModalProps) => {
    const handleInvenSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(invenName.trim() === "" || invenCate === "") {
            alert("값을 모두 입력해주세요.");
            return;
        }

        if(invenQuantity === 0) {
            alert("수량은 1개 이상 필수 입니다.");
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
            setInvenQuantity(0);

            //모달창 종료
            alert(`${data.message}`);
            setInventoryModalShow(false);
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
                onClick={() => setInventoryModalShow(false)}
            ></div>
            <div 
                className='inventory-regi-modal'
                style={{
                    display: `${inventoryModalShow ? "block" : "none"}`
                }}
            >                
                <div className='inventory-regi-modal__write'> 
                    <label htmlFor="" className='inventory-regi-modal__label'>재고명</label>
                    <input 
                        type="text" 
                        className='inventory-regi-modal__input'
                        placeholder='재고명을 입력하세요.'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setInvenName(e.target.value);
                        }}
                    />
                </div> {/* .inventory-regi-modal__write : end */}

                <div className='inventory-regi-modal__write'> 
                    <label htmlFor="" className='inventory-regi-modal__label'>카테고리</label>
                    <select 
                        className='inventory-regi-modal__select'
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
                    </select> {/* .inventory-regi-modal__select : end */}
                </div> {/* .inventory-regi-modal__write : end */}

                <div className='inventory-regi-modal__write'> 
                    <label htmlFor="" className='inventory-regi-modal__label'>재고수량</label>
                    <input 
                        type="number" 
                        min={0}
                        max={100}
                        className='inventory-regi-modal__number'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setInvenQuantity(Number(e.target.value));
                        }}
                    />
                </div> {/* .inventory-regi-modal__write : end */}

                <button 
                    className='inventory-regi-modal__button'
                    onClick={handleInvenSubmit}
                >
                    등록하기
                </button>
            </div> {/* .inventory-regi-modal : end */}
        </>
    );
};

export default InventoryRegiModal;