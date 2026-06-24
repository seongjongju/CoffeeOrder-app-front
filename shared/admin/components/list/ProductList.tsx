'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ProductGetType } from '@/app/types/products/product';
import { CldImage } from 'next-cloudinary';
import { formatNumber } from '@/app/util/format';
import useAdminModal from '@/features/hooks/admin/modal/useAdminModal';
import ProductUpdateModal from '@/app/admin/admin_products/_components/ProductUpdateModal';
import { Inventory } from '@/app/types/inventorys/inventory';
import { productAllDeleteApi, productDeleteApi } from '@/features/adminApi/adminProductApi';
import { useRouter } from 'next/navigation';

const ProductList = ({inventorys, products}: Inventory & ProductGetType) => {
    const router = useRouter();

    const {setModalToggle, modalToggle} = useAdminModal(); //모달창 토글 커스텀 훅

    // Update시, 어떤 제품의 행을 선택했는지 고유 아이디 값 전달용
    const [prdCode, setPrdCode] = useState<string>(""); 

    //일괄 삭제용 배열
    const [productArray, setProductArray] = useState<ProductGetType['products']>([]);

    //전체 삭제용 상태관리
    const [allChecked, setAllChecked] = useState(false);

    //제품 단일 삭제
    const handleCLickProductDelete = async (productCode: string) => {
        try{
            const data = await productDeleteApi(productCode);

            if(!data.success) {
                alert(`${data.message}`);
                return;
            }

            alert(`${data.message}`);
            router.refresh();
            return;
        } catch(err: any) {
            console.error(err.response?.data?.message);
            alert(`${err.response?.data?.message}`);
            return;
        }
    };

    //일괄 삭제용 체크
    const handleCheckProduct = (productCode: string) => {
        const currentProduct = products.find(prd => prd.productCode === productCode);
        if(!currentProduct) return;
        
        setProductArray((prev) => {
            const exists = prev.some(prd => prd.productCode === productCode);
            const next = exists
            ? prev.filter(prd => prd.productCode !== productCode)
            : [...prev, currentProduct]

            setAllChecked(next.length === products.length);
            return next;
        });
    };

    //전체체크
    const handleAllChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(products === undefined) {
            alert('선택 가능한 제품이 없습니다.');
            return;
        }

        if (e.target.checked) {
            setProductArray([...products] as ProductGetType['products']);
            setAllChecked(true);
        } else {
            setProductArray([] as ProductGetType['products']);
            setAllChecked(false);
        }
    };

    //일괄 삭제 서브밋
    const handleClickProductAllDelete = async () => {
        try{
            const data = await productAllDeleteApi(productArray);

            if(!data.success) {
                alert(`${data.message}`);
                return;
            }

            alert(`${data.message}`);
            router.refresh();
            setAllChecked(false);
            return;
        } catch(err: any) {
            console.log(err.response?.data?.message);
            alert(`${err.response?.data?.message}`);
            return;
        }
    };

    return (
        <div
            style={{
                height: "70vh",
                overflow: "auto",
            }}
        >
            <table className='admin-table'>
                <tbody>
                    <tr>
                        <th>
                            <input 
                                type="checkbox" 
                                checked={allChecked}
                                onChange={handleAllChecked}
                            />
                        </th>
                        <th>제품 코드</th>
                        <th>제품 이미지</th>
                        <th>카테고리</th>
                        <th>제품명</th>
                        <th>사용 재고</th>
                        <th>가격</th>
                        <th>추천제품</th>
                        <th>설정</th>
                    </tr>
                    {
                        products?.map((prd) => (
                            <tr key={prd._id}>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        checked={productArray.some(pd => pd.productCode === prd.productCode)}
                                        onChange={() => handleCheckProduct(prd.productCode)}
                                    />
                                </td>
                                <td>{prd.productCode}</td>
                                <td>
                                    <CldImage
                                        src={prd.img.publicId}
                                        width={80}
                                        height={80}
                                        alt={prd.img.imgName}
                                    />
                                </td>
                                <td>{prd.category}</td>
                                <td>{prd.productName}</td>
                                <td style={{ width: "10%" }}>
                                    {
                                        prd.usedInventorys.map((inven) => (
                                            <span key={inven._id}>
                                                {inven.inventoryName}<br />
                                            </span>
                                        ))
                                    }
                                </td>
                                <td>
                                    {
                                        formatNumber(prd.price) + "원"
                                    }
                                </td>
                                <td
                                    className={`${prd.recommend ? "normal" : "lack"}`}
                                >
                                    {
                                        prd.recommend ? "ON" : "OFF"
                                    }
                                </td>
                                <td>
                                    <div style={{display: "flex", gap: "8px", justifyContent: "center"}}>
                                        <button
                                            style={{color: "#4000ff"}}
                                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                                e.preventDefault();
                                                setModalToggle("product-update");
                                                setPrdCode(prd.productCode);
                                            }}
                                        >
                                            수정
                                        </button>
                                        <button
                                            style={{color: "#ff0000"}}
                                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                                e.preventDefault();
                                                handleCLickProductDelete(prd.productCode);
                                            }}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table> {/* .admin-table : end */}

            {
                modalToggle === "product-update" && 
                (
                    <ProductUpdateModal 
                        setModalToggle={setModalToggle}
                        modalToggle={modalToggle}
                        prdCode={prdCode}
                        products={products}
                        inventorys={inventorys}
                    />
                )
            }

            <button
                className='admin-form__regi'
                style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)"
                }}
                onClick={handleClickProductAllDelete}
            >
                일괄삭제
            </button>
        </div>

    );
};

export default ProductList;