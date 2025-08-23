import Product from '@/features/product/components/Product';
import React from 'react';

const ProductPage = () => {
    return (
        <main>
            <section>
                <div className='inner'>
                    <Product />
                </div> {/* inner */}
            </section>
        </main>
    );
};

export default ProductPage;