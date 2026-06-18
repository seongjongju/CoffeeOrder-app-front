'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import React from 'react';
import Link from 'next/link';
import useProductQuery from '@/features/hooks/query/useProductQuery';
import { CldImage } from 'next-cloudinary';
import 'swiper/css';

const Suggestion = () => {
    const { products } = useProductQuery();

    //추천 제품
    const suggestionProducts = products.filter(prd => prd.recommend);
    
    return (
        <Swiper
            spaceBetween={12}
            slidesPerView={3.3}
            modules={[Autoplay]}
            autoplay={{delay: 1500}}
            speed={1200}

            style={{
                marginBottom: '20px'
            }}
        >
            {
                suggestionProducts.map((sug) => (
                    <SwiperSlide
                        key={sug.productCode}
                    >
                        <Link 
                            className='menu-swiper-link'
                            href={`/client/view/${sug.productCode}?category=${sug.category}`}
                        >
                            <CldImage
                                src={sug.img.publicId}
                                width={500}
                                height={500}
                                alt={sug.img.imgName}
                            />
                            <p>{sug.productName}</p>
                        </Link>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default Suggestion;