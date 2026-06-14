'use client';
import React from 'react';
import Link from 'next/link';
import { ProductGetType } from '@/app/types/products/product';
import { CldImage } from 'next-cloudinary';
import { formatPrice } from '@/app/util/format';

const ProductList = ({products}: ProductGetType) => {
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
                                            alt="이미지 없음"
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
                                            >
                                                수정
                                            </button>
                                            <button
                                                style={{color: "#ff0000"}}
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
        </div>
    );
};

export default ProductList;