'use client';
import { Inventory } from '@/app/types/inventorys/inventory';
import { ProductGetType, ProductState, ProductUpdateState } from '@/app/types/products/product';
import { productCategory } from '@/app/util/admin/category';
import { formatNumber } from '@/app/util/format';
import { productUpdateApi } from '@/features/adminApi/adminProductApi';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import React, { Dispatch, memo, SetStateAction, useReducer, useState } from 'react';

interface UpdateProps {
    setModalToggle: Dispatch<SetStateAction<string>>;
    modalToggle: string;
    prdCode: string;
    products: ProductGetType['products'],
    inventorys: Inventory['inventorys'],
}

//제품 업데이트 정보 등 텍스트로 받는 인풋들 reducer
const reducer = (state: ProductUpdateState, action: { type: string; payload: any }): ProductUpdateState => {
    switch(action.type) {
        case "INPUT_UPDATE":
            return state.map(item => 
                        item.id === action.payload.id ?
                        {...item, value: action.payload.value} :
                        item
                    );
        default:
            return state;
    }
};

const ProductUpdateModal = memo(({
    setModalToggle,
    modalToggle,
    prdCode,
    products,
    inventorys,
}: UpdateProps) => {
    const router = useRouter();

    //현재 선택된 행
    const currentProduct = products.find(prd => prd.productCode === prdCode);
    if(!currentProduct) return;

    // 제품 정보 텍스트로 받는 인풋들 업데이트 초기값
    const productInfos = currentProduct.productInfos;

    if(!productInfos) return;
    
    const initialState: ProductUpdateState = [
        { 
            id: "write_0", 
            name: "volume", 
            label: "용량", 
            value: productInfos?.find(info => info.id === "write_0")?.value 
        },
        { 
            id: "write_1", 
            name: "calory", 
            label: "칼로리", 
            value: productInfos?.find(info => info.id === "write_1")?.value 
        },
        { 
            id: "write_2", 
            name: "carbohydrate", 
            label: "탄수화물", 
            value: productInfos?.find(info => info.id === "write_2")?.value 
        },
        { 
            id: "write_3", 
            name: "protein", 
            label: "단백질", 
            value: productInfos?.find(info => info.id === "write_3")?.value 
        },
        { 
            id: "write_4", 
            name: "caffeine", 
            label: "카페인", 
            value: productInfos?.find(info => info.id === "write_4")?.value 
        },
        { 
            id: "write_5", 
            name: "sodium", 
            label: "나트륨", 
            value: productInfos?.find(info => info.id === "write_5")?.value 
        },
        { 
            id: "write_6", 
            name: "sugars", 
            label: "당류",  
            value: productInfos?.find(info => info.id === "write_6")?.value 
        },
        { 
            id: "write_7", 
            name: "saturatedFat", 
            label: "포화지방", 
            value: productInfos?.find(info => info.id === "write_7")?.value 
        },
    ];

    //업데이트를 위한 상태관리
    const [updateImg, setUpdateImg] = useState<{ imgName: string; format: string; publicId: string }>({
        imgName: currentProduct.img.imgName,
        format: currentProduct.img.format,
        publicId: currentProduct.img.publicId,
    }); //이미지

    const [updateProductName, setUpdateProductName] = useState<string>(currentProduct.productName); //제품명
    const [isUpdateProductCategory, setIsUpdateProductCategory] = useState<string>(currentProduct.category); //제품 카테고리
    const [updateUsedInvens, setUpdateUsedInvens] = useState<Inventory['inventorys']>(currentProduct.usedInventorys); //사용 재고

    const [updatePrice, setUpdatePrice] = useState<string>(currentProduct.price); //가격
    const [updateRecommend, setUpdateRecommend] = useState<boolean>(currentProduct.recommend) //추천 제품 등록

    const [updateProductState, dispatch] = useReducer(reducer, initialState); //텍스트로 받는 인풋들 ex) 제품명, 칼로리...

    //수정 인풋 값 받기
    const handleUpdateProductInput = (id: string, value: string) => {
        dispatch({ 
                type: "INPUT_UPDATE", 
                payload: {
                    id: id,
                    value: value,
                }
            }
        );
    };

    //업데이트 재고 체크
    const checkedUpdateInven = (_id: string) => {
        const currentInven = inventorys.find(iv => iv._id === _id);
        if(!currentInven) return;

        setUpdateUsedInvens((prev) => {
            const exists = prev.some(iv => iv._id === _id);
            const next = exists
            ? prev.filter(iv => iv._id !== _id)
            : [...prev, currentInven];
        
            return next;
        });
    };

    //업데이트 서브밋
    const handleUpdateSubmitProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(updateProductName.trim() === "") {
            alert('제품명은 필수 입력 값입니다.');
            return;
        }

        if(updateUsedInvens.length === 0) {
            alert('사용 재고는 필수 값입니다.');
            return;
        }

        if(Number(updatePrice) === 0) {
            alert('가격을 책정해주세요.');
            return;
        }

        try {
            const data = await productUpdateApi(
                prdCode,
                updateImg,
                updateProductName,
                isUpdateProductCategory,
                updateUsedInvens,
                updatePrice,
                updateRecommend,
                updateProductState
            );

            if(!data.success) {
                alert(`${data.message}`);
                return;
            }

            alert(`${data.message}`);
            router.refresh();
            setModalToggle("");
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
                className='admin-modal product'
                style={{
                    display: `${modalToggle === "product-update" ? "block" : "none"}`,
                    width: "1200px"
                }}
            >
                <form action="" encType='multipart/form-data'>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "30px"
                        }}
                    >
                        <div className='admin-modal__item'>
                            <div className='admin-modal__write'> 
                                <label htmlFor="" className='admin-modal__label'>제품 이미지</label>
                                <CldUploadWidget
                                    uploadPreset="coffeOrder"
                                    onSuccess={(results) => {
                                        if (results.event !== "success" || !results.info) return;
                                        
                                        if (typeof results.info !== 'string') {
                                            const info = results.info;

                                            setUpdateImg(() => ({
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
                                                updateImg.imgName !== "" && 
                                                (
                                                    <p className='admin-file-name'>{`${updateImg.imgName}.${updateImg.format}`}</p>
                                                )
                                            }
                                        </div>
                                        
                                    )}
                                </CldUploadWidget>
                            </div> {/* .admin-modal__write : end */}
                            {
                                updateImg.publicId !== "" ? 
                                (
                                    <div className='admin-modal__write'>
                                        <CldImage
                                            src={updateImg.publicId}
                                            width={80}
                                            height={80}
                                            alt={updateImg.imgName}
                                        />
                                    </div>
                                ) : null
                            }
                            
                            <div className='admin-modal__write'> 
                                <label className='admin-modal__label'>제품명</label>
                                <input 
                                    type="text" 
                                    name='productName'
                                    className='admin-modal__input'
                                    placeholder='제품명을 입력하세요.'
                                    value={updateProductName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setUpdateProductName(e.target.value);
                                    }}
                                />
                            </div> {/* .admin-modal__write : end */}

                            <div className='admin-modal__write'> 
                                <label htmlFor="" className='admin-modal__label'>카테고리</label>
                                <select 
                                    className='admin-modal__select'
                                    value={isUpdateProductCategory}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        setIsUpdateProductCategory(e.target.value);
                                    }}
                                >
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
                                <label htmlFor="" className='admin-modal__label'>사용 재고 선택</label>
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
                                                    checked={updateUsedInvens.some(iv => iv._id === inven._id)}
                                                    onChange={() => {
                                                        checkedUpdateInven(inven._id);
                                                    }}
                                                />
                                                <label className='admin-modal__label'>{inven?.inventoryName}</label>
                                            </div>
                                        ))
                                    }
                                </div> {/* .product-regi-modal__check-wrap : end */}
                            </div> {/* .admin-modal__write : end */}

                            <div className='admin-modal__write'> 
                                <label className='admin-modal__label'>가격</label>
                                <input 
                                    type="text" 
                                    className='admin-modal__input'
                                    placeholder={currentProduct.price}
                                    value={updatePrice}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setUpdatePrice(formatNumber(e.target.value));
                                    }}
                                />
                            </div> {/* .admin-modal__write : end */}
                        </div> {/* .admin-modal__item : end */}
                        
                        <div 
                            className='admin-modal__item'
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)"
                            }}
                        >
                            <div className='admin-modal__write' style={{ 
                                flexDirection: "column", 
                                alignItems: "flex-start",
                                gridColumn: "span 2"

                            }}> 
                                <label htmlFor="" className='admin-modal__label'>추천 제품 등록</label>
                                <div className='product-regi-modal__check-wrap'>
                                    <div
                                        className='product-regi-modal__check'
                                    >
                                        <input 
                                            type="checkbox"
                                            className='product-regi-modal__checkbox'
                                            checked={updateRecommend}
                                            onChange={() => setUpdateRecommend(prev => !prev)}
                                        />
                                        <label className='admin-modal__label'>ON</label>
                                    </div>
                                </div> {/* .product-regi-modal__check-wrap : end */}
                            </div> {/* .admin-modal__write : end */}

                            {
                                updateProductState.map((info) => (
                                <div 
                                    className='admin-modal__write'
                                    key={info.id}
                                > 
                                    <label htmlFor="" className='admin-modal__label'>{info.label}</label>
                                    <input 
                                        type="text" 
                                        name={info.name}
                                        className='admin-modal__input'
                                        placeholder={info.value}
                                        value={info.value}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            handleUpdateProductInput(info.id, formatNumber(e.target.value));
                                        }}
                                    />
                                </div> 
                                ))
                            }
                        </div> {/* .admin-modal__item : end */}
                    </div>

                    <button 
                        className='product-regi-modal__button'
                        onClick={handleUpdateSubmitProduct}
                    >
                        수정하기
                    </button>
                </form>
            </div> {/* .product-regi-modal : end */}
        </>
    );
});

export default ProductUpdateModal;