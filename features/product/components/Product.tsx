'use client';

import React from 'react';
import tabStyles from '@/shared/components/Tab/Tab.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductLists from './ProductLists';

const Product = () => {
    return (
        <div>
            <Swiper
                className={tabStyles.tab_btns}
                slidesPerView={'auto'}
                spaceBetween={10}
            >
                <SwiperSlide className={tabStyles.tab_btn_slide}>
                    <button className={`${tabStyles.tab_btn} ${tabStyles.on}`}>
                        ICE
                    </button>
                </SwiperSlide>
                <SwiperSlide className={tabStyles.tab_btn_slide}>
                    <button className={tabStyles.tab_btn}>
                        HOT
                    </button>
                </SwiperSlide>
                <SwiperSlide className={tabStyles.tab_btn_slide}>
                    <button className={tabStyles.tab_btn}>
                        시즌한정
                    </button>
                </SwiperSlide>
                <SwiperSlide className={tabStyles.tab_btn_slide}>
                    <button className={tabStyles.tab_btn}>
                        디카페인
                    </button>
                </SwiperSlide>
                <SwiperSlide className={tabStyles.tab_btn_slide}>
                    <button className={tabStyles.tab_btn}>
                        디저트
                    </button>
                </SwiperSlide>
            </Swiper>
            
            <ProductLists />
        </div>
    );
};

export default Product;