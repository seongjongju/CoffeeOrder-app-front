'use client';
import useProductQuery from '@/features/hooks/query/useProductQuery';
import { CldImage } from 'next-cloudinary';
import React from 'react';
import ViewDetail from './ViewDetail';

interface ViewProps {
    prdParams: string;
};

const VIewInterface = ({prdParams}: ViewProps) => {
    const {products} = useProductQuery();

    //해당 상세내용만 불러오기 위한 필터링
    const viewProduct = products?.find(prd => prd.productCode === prdParams);

    if(!viewProduct) return;

    return (
        <>
            <nav className='inner'>
                <figure className='view-thum'>
                    <CldImage
                        className='view-thum__image'
                        src={viewProduct.img.publicId}
                        width={500}
                        height={500}
                        alt={viewProduct.img.imgName}
                    />
                </figure>
                <p className='view-thum__title'>{viewProduct.productName}</p> 

                <p className='view-title'>옵션</p>

                <ViewDetail 
                    productInfos={viewProduct.productInfos}
                />
            </nav>
        </>
    );
};

export default VIewInterface;