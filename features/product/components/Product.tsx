'use client';

import React from 'react';
import tabStyles from '@/shared/components/Tab/Tab.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';

const Product = () => {
    return (
        <div>
            <Swiper
                className={tabStyles.tan_btns}
            >
                <SwiperSlide>

                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Product;