import React from 'react';
import productStyles from '@/features/product/product.module.css';
import Image from 'next/image';
import newHotImg1 from '@/shared/assets/images/contents/newhot_img1.svg';
import ProductNavigationBar from '@/features/product/components/ProductNavigationBar';
import ProductOptionsWrap from '@/features/product/components/ProductOptionsWrap';

const ProductViewPage = () => {
    return (
        <main>
            <section>
                <div className='inner'>
                    <div className={productStyles.product_view_image}>
                        <Image  src={newHotImg1} alt='view이미지' />
                    </div>
                    <p className={productStyles.product_view_name}>아메리카노</p>
                    <div className={productStyles.product_view_options}>
                        <p className={productStyles.product_view_heading}>Size</p>
                        <button className={productStyles.size_btn}>Large</button>
                        <button className={productStyles.size_btn}>Extra Large</button>
                    </div>

                    <div className={productStyles.product_view_options}>
                        <p className={productStyles.product_view_heading}>Options</p>
                        <ProductOptionsWrap />
                    </div>
                </div> {/* inner */}
            </section>

            <ProductNavigationBar />
        </main>
    );
};

export default ProductViewPage;