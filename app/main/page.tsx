'use client';
import { Inner } from '@/shared/styled/GlobalStyled';
import {Main, Visual, MainTitle, MenuSwiperLink, TabBtns, TabBtn} from '@/shared/styled/MainStyled';
import Image from 'next/image';
import mainBanner from '@/public/images/mainBanner.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';
import Link from 'next/link';
import { Autoplay } from 'swiper/modules';
import useMenu from '@/app/api/hook/useMenu';
import MenuTabItems from '@/features/menuTab/components/MenuTabItems';

const MainPage = () => {
    const {iceCoffeeState, hotCoffeeState, juiceState, dessertState} = useMenu();

    return (
        <Main>
            <Inner>
                {/* visual */}
                <Visual>
                    <Image src={mainBanner} alt='메인 배너' />
                </Visual>

                <MainTitle>추천 메뉴!!</MainTitle>
            </Inner>

            {/* menuSwiper */}
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
                <SwiperSlide>
                    <MenuSwiperLink href={''}>
                        <img src={iceCoffeeState[0]?.img} alt={iceCoffeeState[0]?.menuname} />
                        <p>{iceCoffeeState[0]?.menuname}</p>
                    </MenuSwiperLink>
                </SwiperSlide>
                <SwiperSlide>
                    <MenuSwiperLink href={''}>
                        <img src={hotCoffeeState[1]?.img} alt={hotCoffeeState[1]?.menuname} />
                        <p>{hotCoffeeState[1]?.menuname}</p>
                    </MenuSwiperLink>
                </SwiperSlide>
                <SwiperSlide>
                    <MenuSwiperLink href={''}>
                        <img src={juiceState[0]?.img} alt={juiceState[0]?.menuname} />
                        <p>{juiceState[0]?.menuname}</p>
                    </MenuSwiperLink>
                </SwiperSlide>
                <SwiperSlide>
                    <MenuSwiperLink href={''}>
                        <img src={dessertState[0]?.img} alt={dessertState[0]?.menuname} />
                        <p>{dessertState[0]?.menuname}</p>
                    </MenuSwiperLink>
                </SwiperSlide>
                <SwiperSlide>
                    <MenuSwiperLink href={''}>
                        <img src={iceCoffeeState[1]?.img} alt={iceCoffeeState[1]?.menuname} />
                        <p>{iceCoffeeState[1]?.menuname}</p>
                    </MenuSwiperLink>
                </SwiperSlide>
            </Swiper>

            <Inner>
                <MainTitle>주문 하기!!</MainTitle>
                {/* 주문하기 탭 */}
                <TabBtns>
                    <TabBtn>커피</TabBtn>
                    <TabBtn>주스</TabBtn>
                    <TabBtn>디저트</TabBtn>
                </TabBtns>

                {/* 주문하기 메뉴 */}
                <MenuTabItems />
            </Inner>
        </Main>
    );
};

export default MainPage;