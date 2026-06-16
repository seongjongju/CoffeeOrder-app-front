'use client';
import { Inventory } from '@/app/types/inventorys/inventory';
import { ProductState, ProductType } from '@/app/types/products/product';
import { productCategory } from '@/app/util/admin/category';
import { productInfoWrites } from '@/app/util/admin/product';
import { productRegiApi } from '@/features/adminApi/adminProductApi';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { useRouter } from 'next/navigation';
import React, { Dispatch, memo, SetStateAction, useReducer, useState } from 'react';
interface ModalProps {
    setModalToggle: Dispatch<SetStateAction<string>>;
    modalToggle: string;
    inventorys: Inventory['inventorys'];
};

//제품 정보 텍스트로 받는 인풋들 초기값
const initialState: ProductState = [
    { id: "write_0", name: "volume", value: 0 },         // 용량
    { id: "write_1", name: "calory", value: 0 },         // 칼로리
    { id: "write_2", name: "carbohydrate", value: 0 },   // 탄수화물
    { id: "write_3", name: "protein", value: 0 },        // 단백질
    { id: "write_4", name: "caffeine", value: 0 },       // 카페인
    { id: "write_5", name: "sodium", value: 0 },         // 나트륨
    { id: "write_6", name: "sugars", value: 0 },         // 당류
    { id: "write_7", name: "saturatedFat", value: 0 },    // 포화지방
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
    const router = useRouter();

    const [img, setImg] = useState<{ imgName: string; format: string; publicId: string }>({
        imgName: "",
        format: "",
        publicId: "",
    }); //이미지

    const [productName, setProductName] = useState<string>(""); //제품명
    const [isProductCategory, setIsProductCategory] = useState<string>(""); //제품 카테고리
    const [usedInvens, setUsedInvens] = useState<Inventory['inventorys']>([]); //사용 재고

    const [productState, dispatch] = useReducer(reducer, initialState); //텍스트로 받는 인풋들 ex) 제품명, 칼로리...

    console.log(productState)

    const [price, setPrice] = useState<number>(0); //가격
    const [recommend, setRecommend] = useState<boolean>(false) //추천 제품 등록

    //인풋 값 받기
    const handleChangeProductInput = (id: string, value: number) => {
        dispatch({ 
                type: "INPUT_REGI", 
                payload: {
                    id: id,
                    value: { value: value },
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
    const handleSubmitProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(!img || !productName || !isProductCategory || !usedInvens || !price) {
            alert('필수 입력 및 선택 값을 확인해주세요.');
            return;
        }

        try {   
            const data = await productRegiApi(
                img,
                productName.trim(),
                isProductCategory,
                usedInvens,
                price,
                recommend,
                productState
            );

            if(!data.success) {
                alert(`${data.message}`);
                return;
            }

            alert(`${data.message}`);
            setModalToggle("");
            dispatch({ type: "RESET", payload: {}});
            router.refresh();
            return;
        } catch(err: any) {
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
                    display: `${modalToggle === "product-regi" ? "block" : "none"}`
                }}
            >
                <form action="" encType='multipart/form-data'>
                    <div className='admin-modal__write'> 
                        <label htmlFor="" className='admin-modal__label'>
                            제품 이미지<span style={{color: "#ff0000"}}>*</span>
                        </label>
                        <CldUploadWidget 
                            uploadPreset="coffeOrder"
                            onSuccess={(results) => {
                                if (results.event !== "success" || !results.info) return;
                                
                                if (typeof results.info !== 'string') {
                                    const info = results.info;

                                    setImg((prev) => ({
                                        ...prev,
                                        imgName: info.display_name || '',
                                        format: info.format,
                                        publicId: info.public_id,
                                    }));
                                }
                            }}
                        >
                            {({ open }) => (
                                <div>
                                    <button 
                                        type='button' 
                                        className='admin-file'
                                        onClick={() => open()}
                                    >
                                        이미지 업로드
                                    </button>
                                    {
                                        img.imgName !== "" && 
                                        (
                                            <p className='admin-file-name'>{`${img.imgName}.${img.format}`}</p>
                                        )
                                    }
                                </div>
                                
                            )}
                        </CldUploadWidget>
                    </div> {/* .admin-modal__write : end */}
                    
                    <div className='admin-modal__write'> 
                        <label className='admin-modal__label'>
                            제품명<span style={{color: "#ff0000"}}>*</span>
                        </label>
                        <input 
                            type="text" 
                            name='productName'
                            className='admin-modal__input'
                            placeholder='제품명을 입력하세요.'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setProductName(e.target.value);
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
                                setIsProductCategory(e.target.value);
                            }}
                        >
                            <option value="">카테고리 선택</option>
                            {
                                productCategory.map((cate) => (
                                    <option value={cate.cate} key={cate.id}>{cate.cate}</option>
                                ))
                            }
                        </select> {/* .admin-modal__select : end */}
                    </div> {/* .admin-modal__write : end */}

                    <div className='admin-modal__write' style={{ 
                        flexDirection: "column", 
                        alignItems: "flex-start"
                    }}> 
                        <label htmlFor="" className='admin-modal__label'>
                            사용 재고 선택<span style={{color: "#ff0000"}}>*</span>
                        </label>
                        <div className='product-regi-modal__check-wrap'>
                            {
                                inventorys?.map((inven) => (
                                    <div
                                        key={inven._id} 
                                        className='product-regi-modal__check'
                                    >
                                        <input 
                                            type="checkbox"
                                            className='product-regi-modal__checkbox' 
                                            checked={usedInvens.some(iv => iv._id === inven._id)}
                                            onChange={() => {
                                                checkedUsedInven(inven._id);
                                            }}
                                        />
                                        <label className='admin-modal__label'>{inven?.inventoryName}</label>
                                    </div>
                                ))
                            }
                        </div> {/* .product-regi-modal__check-wrap : end */}
                    </div> {/* .admin-modal__write : end */}

                    <div className='admin-modal__write'> 
                        <label className='admin-modal__label'>
                            가격<span style={{color: "#ff0000"}}>*</span>
                        </label>
                        <input 
                            type="number" 
                            min={0}
                            step="500"
                            className='admin-modal__input'
                            placeholder='가격을 입력하세요.'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setPrice(Number(e.target.value));
                            }}
                        />
                    </div> {/* .admin-modal__write : end */}

                    <div className='admin-modal__write' style={{ 
                        flexDirection: "column", 
                        alignItems: "flex-start"
                    }}> 
                        <label htmlFor="" className='admin-modal__label'>추천 제품 등록</label>
                        <div className='product-regi-modal__check-wrap'>
                            <div
                                className='product-regi-modal__check'
                            >
                                <input 
                                    type="checkbox"
                                    className='product-regi-modal__checkbox'
                                    checked={recommend}
                                    onChange={() => setRecommend(prev => !prev)}
                                />
                                <label className='admin-modal__label'>ON</label>
                            </div>
                        </div> {/* .product-regi-modal__check-wrap : end */}
                    </div> {/* .admin-modal__write : end */}

                    {
                        productInfoWrites.map((info) => (
                        <div 
                            className='admin-modal__write'
                            key={info.id}
                        > 
                            <label htmlFor="" className='admin-modal__label'>{info.label}</label>
                            <input 
                                type="number" 
                                name={info.name}
                                min={0}
                                className='admin-modal__input'
                                placeholder={info.placeholder}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeProductInput(info.id, Number(e.target.value));
                                }}
                            />
                        </div> 
                        ))
                    }

                    <button 
                        className='product-regi-modal__button'
                        onClick={handleSubmitProduct}
                    >
                        등록하기
                    </button>
                </form>
            </div> {/* .product-regi-modal : end */}
        </>
    );
});

export default ProductRegiModal;