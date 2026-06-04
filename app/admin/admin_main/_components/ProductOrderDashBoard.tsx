import Link from 'next/link';
import React from 'react';

const ProductOrderDashBoard = () => {
    return (
        <div className='dashboard'>
            <div className='admin-title-ui'>
                <h3 className='admin-title-ui__title'>제품별 주문 수</h3>
                <Link 
                    href={'/admin/admin_statistics'}
                    className='admin-title-ui__more'
                >
                    전체보기
                </Link>
            </div> {/* .admin-title-ui : end */}

            차트 들어갈 예정
        </div>
    );
};

export default ProductOrderDashBoard;