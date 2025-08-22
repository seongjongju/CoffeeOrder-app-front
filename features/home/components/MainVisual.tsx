'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import homeStyles from '../home.module.css';
import Image from 'next/image';
import visual1 from '@/shared/assets/images/contents/visual1.svg';
import visual2 from '@/shared/assets/images/contents/visual2.svg';

const MainVisual = () => {  
    return (
        <div id={homeStyles.visual}>
            <div className='inner'>
                <Swiper 
                    className={`${homeStyles.main_visual} main_visual`}
                    modules={[Autoplay, Pagination]}   
                    autoplay={{delay: 2500}}
                    loop={true}
                    speed={1200}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                >
                    <SwiperSlide className={homeStyles.visual_slide}>
                        <Image src={visual1} priority alt='오늘은 어떤 커피 드실래요?' />
                    </SwiperSlide>
                    <SwiperSlide className={homeStyles.visual_slide}>
                        <Image src={visual2} priority alt='달콤한 여름 딸기 라떼' />
                    </SwiperSlide>
                </Swiper>
            </div> {/* inner */}
        </div>
    );
};

export default MainVisual;