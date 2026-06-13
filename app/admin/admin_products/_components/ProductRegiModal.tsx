'use client';
import { Inventory } from '@/app/types/inventorys/inventory';
import { productCategory } from '@/app/util/admin/category';
import React, { Dispatch, memo, SetStateAction, useReducer, useState } from 'react';
interface ModalProps {
    setModalToggle: Dispatch<SetStateAction<string>>;
    modalToggle: string;
    inventorys: Inventory['inventorys'];
};

//제품 타입
type ProductType = {
    id: string;
    productName?: string;
    volume?: string;
    calory?: string;
    carbohydrate?: string;
    protein?: string;
    caffeine?: string;
    sodium?: string;
    sugars?: string;
    saturatedFat?: string;
};

type ProductState = Array<ProductType>;

//제품 정보 텍스트로 받는 인풋들
const productInfoWrites = [
    { id: "write_0", name: "volume", label: "용량", placeholder: "용량을 입력하세요." },
    { id: "write_1", name: "calory", label: "칼로리", placeholder: "칼로리를 입력하세요." },
    { id: "write_2", name: "carbohydrate", label: "탄수화물", placeholder: "탄수화물 함량을 입력하세요." },
    { id: "write_3", name: "protein", label: "단백질", placeholder: "단백질 함량을 입력하세요." },
    { id: "write_4", name: "caffeine", label: "카페인", placeholder: "카페인 함량을 입력하세요." },
    { id: "write_5", name: "sodium", label: "나트륨", placeholder: "나트륨 함량을 입력하세요." },
    { id: "write_6", name: "sugars", label: "당류", placeholder: "당류 함량을 입력하세요." },
    { id: "write_7", name: "saturatedFat", label: "포화지방", placeholder: "포화지방 함량을 입력하세요." },
];

//제품 정보 텍스트로 받는 인풋들 초기값
const initialState: ProductState = [
    { id: "write_0", volume: "" }, //용량
    { id: "write_1", calory: "" }, //칼로리
    { id: "write_2", carbohydrate: "" }, //탄수화물
    { id: "write_3", protein: "" }, //단백질
    { id: "write_4", caffeine: "" }, //카페인
    { id: "write_5", sodium: "" }, //나트륨
    { id: "write_6", sugars : "" }, //당류
    { id: "write_7", saturatedFat : "" }, //포화지방
];

//제품 정보 등 텍스트로 받는 인풋들 reducer
const reducer = (state: ProductState, action: { type: string; payload: any }): ProductState => {
    switch(action.type) {
        case "INPUT_REGI":
            return state.map(item => 
                        item.id === action.payload.id ?
                        {...item, ...action.payload.value} :
                        item
                    );
        case "RESET":
            return [];
        default:
            return state;
    }
};

const ProductRegiModal = memo(({ 
    setModalToggle, 
    modalToggle, 
    inventorys 
}: ModalProps) => {
    const [img, setImg] = useState<{ file: File | null; url: string }>({
        file: null,
        url: "",
    }); //이미지

    const [productName, setProductName] = useState<string>(""); //제품명
    const [isProductCategory, setIsProductCategory] = useState<string>(""); //제품 카테고리
    const [usedInvens, setUsedInvens] = useState<Inventory['inventorys']>([]);

    const [productState, dispatch] = useReducer(reducer, initialState); //텍스트로 받는 인풋들 ex) 제품명, 칼로리...

    //이미지 받기
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;
        const selectedFile = e.target.files[0];

        const previewUrl = URL.createObjectURL(selectedFile);

        setImg((prev) => ({
            ...prev,
            file: selectedFile,
            url: previewUrl,
        }));
    };

    //인풋 값 받기
    const handleChangeProductInput = (id: string, item: string, value: string) => {
        dispatch({ 
                type: "INPUT_REGI", 
                payload: {
                    id: id,
                    value: { [item]: value },
                }
            }
        );
    };

    //사용 재고 체크
    const checkedUsedInven = (_id: string) => {
        const currentInven = inventorys.find(iv => iv._id === _id);
        if(!currentInven) return;

        setUsedInvens((prev) => {
            const exists = prev.some(iv => iv._id === _id);
            const next = exists
            ? prev.filter(iv => iv._id !== _id)
            : [...prev, currentInven];
        
            return next;
        });
    };

    //제품 등록
    const handleSubmitProduct = async () => {
        const formData = new FormData();
    };

    return (
        <>
            <div 
                className='dim'
                onClick={() => setModalToggle("")}
            ></div>
            <div 
                className='product-regi-modal'
                style={{
                    display: `${modalToggle === "product-regi" ? "block" : "none"}`
                }}
            >
                <form action="" encType='multipart/form-data'>
                    <div className='product-regi-modal__write'> 
                        <label htmlFor="" className='product-regi-modal__label'>제품 이미지</label>
                        <input 
                            type="file"
                            accept="image/*"
                            className='product-regi-modal__file' 
                            onChange={handleFileChange}
                        />
                    </div> {/* .product-regi-modal__write : end */}
                    
                    <div className='product-regi-modal__write'> 
                        <label className='product-regi-modal__label'>제품명</label>
                        <input 
                            type="text" 
                            name='productName'
                            className='product-regi-modal__input'
                            placeholder='제품명을 입력하세요.'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setProductName(e.target.value);
                            }}
                        />
                    </div> {/* .product-regi-modal__write : end */}

                    <div className='product-regi-modal__write'> 
                        <label htmlFor="" className='product-regi-modal__label'>카테고리</label>
                        <select 
                            className='product-regi-modal__select'
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                setIsProductCategory(e.target.value);
                            }}
                        >
                            <option value="">카테고리 선택</option>
                            {
                                productCategory.map((cate) => (
                                    <option value={cate.cate} key={cate.id}>{cate.cate}</option>
                                ))
                            }
                        </select> {/* .product-regi-modal__select : end */}
                    </div> {/* .product-regi-modal__write : end */}

                    <div className='product-regi-modal__write check'> 
                        <label htmlFor="" className='product-regi-modal__label'>사용 재고 선택</label>
                        <div className='product-regi-modal__check-wrap'>
                            {
                                inventorys?.map((inven) => (
                                    <div
                                        key={inven._id} 
                                        className='product-regi-modal__check'>
                                        <input 
                                            type="checkbox"
                                            className='product-regi-modal__checkbox' 
                                            checked={usedInvens.some(iv => iv._id === inven._id)}
                                            onChange={() => {
                                                checkedUsedInven(inven._id);
                                            }}
                                        />
                                        <label className='product-regi-modal__label'>{inven?.inventoryName}</label>
                                    </div>
                                ))
                            }
                        </div> {/* .product-regi-modal__check-wrap : end */}
                    </div> {/* .product-regi-modal__write : end */}

                    {
                        productInfoWrites.map((info) => (
                        <div 
                            className='product-regi-modal__write'
                            key={info.id}
                        > 
                            <label htmlFor="" className='product-regi-modal__label'>{info.label}</label>
                            <input 
                                type="text" 
                                name={info.name}
                                className='product-regi-modal__input'
                                placeholder={info.placeholder}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeProductInput(info.id, e.target.name, e.target.value);
                                }}
                            />
                        </div> 
                        ))
                    }

                    <button className='product-regi-modal__button'>등록하기</button>
                </form>
            </div> {/* .product-regi-modal : end */}
        </>
    );
});

export default ProductRegiModal;