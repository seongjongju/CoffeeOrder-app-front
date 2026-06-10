import React from 'react';
import Link from 'next/link';

const ProductList = () => {
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
                            <th>선택</th>
                            <th>번호</th>
                            <th>제품 코드</th>
                            <th>제품 이미지</th>
                            <th>카테고리</th>
                            <th>제품명</th>
                            <th>가격</th>
                            <th>추천제품</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>1</td>
                            <td>PRD-1</td>
                            <td></td>
                            <td>커피</td>
                            <td>아메리카노</td>
                            <td>3,000원</td>
                            <td>ON</td>
                            <td>
                                <div style={{display: "flex", gap: "8px", justifyContent: "center"}}>
                                    <Link 
                                        href={''}
                                    >
                                        자세히
                                    </Link>
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
                    </tbody>
                </table> {/* .admin-table : end */}
            </div>
        </div>
    );
};

export default ProductList;