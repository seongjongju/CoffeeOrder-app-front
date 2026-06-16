'use client';
import { Inventory } from '@/app/types/inventorys/inventory';
import { ProductGetType, ProductType } from '@/app/types/products/product';
import { CldImage } from 'next-cloudinary';
import React from 'react';

type ProductView = {
    category: string;
    img: {
        format: string;
        imgName: string;
        publicId: string;
    };
    price: number;
    productCode: string;
    productInfos: ProductType;
    productName: string;
    recommend: boolean;
    usedInventorys: Inventory;
};

interface ProductViewProps {
    PRD: string;
    products: ProductView[];
};

const ProductView = ({ PRD, products }: ProductViewProps) => {
    const viewProduct = products.find(prd => prd.productCode === PRD);
    if(!viewProduct) return;

    
    return (
        <div className='admin-view'>
            <CldImage
                className='admin-view__image'
                src={viewProduct.img.publicId}
                width={500}
                height={500}
                alt={viewProduct.img.imgName}
            />
        </div>
    );
};

export default ProductView;