import Link from 'next/link';
import React from 'react';
import productStyles from '../product.module.css';
import Image from 'next/image';
import newHotImg1 from '@/shared/assets/images/contents/newhot_img1.svg';

const ProductItems = () => {
    return (
        <div className={productStyles.product_item}>
            <Link href={''}>
                <div className={productStyles.product_item_inner}>
                    <div className={productStyles.product_image}>
                        <Image src={newHotImg1} alt='제품 이미지' />
                    </div>
                    <div className={productStyles.product_item_info}>
                        <p className={productStyles.product_name}>제품명</p>
                        <p className={productStyles.product_price}>4,000원</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductItems;