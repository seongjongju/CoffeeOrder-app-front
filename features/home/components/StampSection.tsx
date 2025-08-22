'use client';

import Image from "next/image";
import React from 'react';
import homeStyles from '../home.module.css';
import stampOff from '@/shared/assets/images/ico/stamp_off.svg';
import stampOn from '@/shared/assets/images/ico/stamp_on.svg';
import Link from "next/link";

const StampSection = () => {
    return (
        <section>
            <div className='inner'>
                <h2 className='title'>STAMP</h2>
                <div className={homeStyles.stamp_wrap}>
                    <ul className={homeStyles.stamp}>
                        <li className={homeStyles.stamp_item}>
                            <Image src={stampOn} alt="스탬프 이미지 on" />
                        </li>
                        <li className={homeStyles.stamp_item}>
                            <Image src={stampOff} alt="스탬프 이미지 off" />
                        </li>
                        <li className={homeStyles.stamp_item}>
                            <Image src={stampOff} alt="스탬프 이미지 off" />
                        </li>
                        <li className={homeStyles.stamp_item}>
                            <Image src={stampOff} alt="스탬프 이미지 off" />
                        </li>
                        <li className={homeStyles.stamp_item}>
                            <Image src={stampOff} alt="스탬프 이미지 off" />
                        </li>
                        <li className={homeStyles.stamp_item}>
                            <Image src={stampOff} alt="스탬프 이미지 off" />
                        </li>
                        <li className={homeStyles.stamp_item}>
                            <Image src={stampOff} alt="스탬프 이미지 off" />
                        </li>
                        <li className={homeStyles.stamp_item}>
                            <Image src={stampOff} alt="스탬프 이미지 off" />
                        </li>
                        <li className={homeStyles.stamp_item}>
                            <Image src={stampOff} alt="스탬프 이미지 off" />
                        </li>
                        <li className={homeStyles.stamp_item}>
                            <Image src={stampOff} alt="스탬프 이미지 off" />
                        </li>
                    </ul> {/* stamp */}
                    <Link href={''} className="common_btn">
                        사용 가능한 쿠폰 : 0
                    </Link>
                </div> {/* stamp_wrap */}
            </div> {/* inner */}
        </section>
    );
};

export default StampSection;