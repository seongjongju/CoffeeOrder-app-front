'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ProductGetType } from '@/app/types/products/product';
import { CldImage } from 'next-cloudinary';
import { formatPrice } from '@/app/util/format';
import useAdminModal from '@/features/hooks/admin/modal/useAdminModal';
import ProductUpdateModal from '@/app/admin/admin_products/_components/ProductUpdateModal';
import { Inventory } from '@/app/types/inventorys/inventory';
import { productDeleteApi } from '@/features/adminApi/adminProductApi';
import { useRouter } from 'next/navigation';

const ProductList = ({inventorys, products}: Inventory & ProductGetType) => {
    const router = useRouter();

    const {setModalToggle, modalToggle} = useAdminModal(); //모달창 토글 커스텀 훅

    // Update시, 어떤 제품의 행을 선택했는지 고유 아이디 값 전달용
    const [prdCode, setPrdCode] = useState<string>(""); 

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

    return (
        <div 
            className='dashboard'
            style={{
                minHeight: "80vh"
            }}
        >
            <div
                style={{
                    height: "83%",
                    overflow: "auto"
                }}
            >
                <table className='admin-table'>
                    <tbody>
                        <tr>
                            <th>
                                <input type="checkbox" />
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
                                        <input type="checkbox" />
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
                                            formatPrice(prd.price) + "원"
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
            </div>

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
        </div>
    );
};

export default ProductList;