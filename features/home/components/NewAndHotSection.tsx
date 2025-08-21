'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import styles from '../home.module.css'
import Link from 'next/link';
import Image from 'next/image';
import newHotImg1 from '@/shared/assets/images/contents/newhot_img1.svg';

const NewAndHotSection = () => {
    return (
        <section>
            <h2 className='title inner'>NEW & HOT</h2>
            <Swiper 
                className={styles.newhot_swiper}
                modules={[Autoplay]}
                autoplay={{delay: 2500}}
                slidesPerView={"auto"}
                spaceBetween={20}
                speed={1200}
            >
                <SwiperSlide className={styles.newhot_slide}>
                    <Link href={''}>
                        <div className={styles.newhot_badge}>
                            <span className={`${styles.badge} ${styles.hot_badge}`}>HOT</span>
                            <span className={`${styles.badge} ${styles.new_badge}`}>NEW</span>
                            <span className={`${styles.badge} ${styles.season_badge}`}>시즌한정</span>
                        </div>
                        <p className={styles.newhot_name}>딸기라떼</p>
                        <div className={styles.newhot_image}>
                            <Image src={newHotImg1} alt="딸기라떼" /> {/* 이미지 수정 필요 */}
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className={styles.newhot_slide}>
                    <Link href={''}>
                        <div className={styles.newhot_badge}>
                            <span className={`${styles.badge} ${styles.hot_badge}`}>HOT</span>
                            <span className={`${styles.badge} ${styles.new_badge}`}>NEW</span>
                            <span className={`${styles.badge} ${styles.season_badge}`}>시즌한정</span>
                        </div>
                        <p className={styles.newhot_name}>딸기라떼</p>
                        <div className={styles.newhot_image}>
                            <Image src={newHotImg1} alt="딸기라떼" /> {/* 이미지 수정 필요 */}
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className={styles.newhot_slide}>
                    <Link href={''}>
                        <div className={styles.newhot_badge}>
                            <span className={`${styles.badge} ${styles.hot_badge}`}>HOT</span>
                            <span className={`${styles.badge} ${styles.new_badge}`}>NEW</span>
                            <span className={`${styles.badge} ${styles.season_badge}`}>시즌한정</span>
                        </div>
                        <p className={styles.newhot_name}>딸기라떼</p>
                        <div className={styles.newhot_image}>
                            <Image src={newHotImg1} alt="딸기라떼" /> {/* 이미지 수정 필요 */}
                        </div>
                    </Link>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default NewAndHotSection;