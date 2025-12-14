'use client';
import '@/shared/styled/main/main.css';
import Image from 'next/image';
import mainBanner from '@/public/images/mainBanner.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useState } from 'react';
import Link from 'next/link';
import { Autoplay } from 'swiper/modules';
import useMenu from '@/app/api/hook/useMenu';
import MenuTabItems from '@/features/menuTab/components/MenuTabItems';

const MainPage = () => {
    const {iceCoffeeState, hotCoffeeState, juiceState, dessertState} = useMenu();
    const [tabState, setTabState] = useState<{coffee: boolean, juice: boolean, dessert: boolean}>({
        coffee: true,
        juice: false,
        dessert: false
    });

    return (
        <main className='main'>
            <div className='inner'>
                {/* visual */}
                <div className='visual'>
                    <Image src={mainBanner} alt='메인 배너' />
                </div>

                <h2 className='main-title'>추천 메뉴!!</h2>
            </div>

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
                    <Link className='menu-swiper-link' href={''}>
                        <img src={iceCoffeeState[0]?.img} alt={iceCoffeeState[0]?.menuname} />
                        <p>{iceCoffeeState[0]?.menuname}</p>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link className='menu-swiper-link' href={''}>
                        <img src={hotCoffeeState[1]?.img} alt={hotCoffeeState[1]?.menuname} />
                        <p>{hotCoffeeState[1]?.menuname}</p>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link className='menu-swiper-link' href={''}>
                        <img src={juiceState[0]?.img} alt={juiceState[0]?.menuname} />
                        <p>{juiceState[0]?.menuname}</p>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link className='menu-swiper-link' href={''}>
                        <img src={dessertState[0]?.img} alt={dessertState[0]?.menuname} />
                        <p>{dessertState[0]?.menuname}</p>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link className='menu-swiper-link' href={''}>
                        <img src={iceCoffeeState[1]?.img} alt={iceCoffeeState[1]?.menuname} />
                        <p>{iceCoffeeState[1]?.menuname}</p>
                    </Link>
                </SwiperSlide>
            </Swiper>

            <div className='inner'>
                <h2 className='main-title'>주문 하기!!</h2>
                {/* 주문하기 탭 */}
                <div className='tab-btns'>
                    <button 
                        className='tab-btn' 
                        style={
                            {backgroundColor: (tabState.coffee && "#2B1B16") || undefined, color: (tabState.coffee && "#fff") || undefined,} 
                        }
                        onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            setTabState(prev => ({ ...prev, coffee: true, juice: false, dessert: false }))
                        }}>
                        커피
                    </button>
                    <button
                        className='tab-btn'
                        style={
                            {backgroundColor: (tabState.juice && "#2B1B16") || undefined, color: (tabState.juice && "#fff") || undefined,}
                        }
                        onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            setTabState(prev => ({ ...prev, coffee: false, juice: true, dessert: false }))
                        }}
                    >
                        주스
                    </button>
                    <button
                        className='tab-btn' 
                        style={
                            {backgroundColor: (tabState.dessert && "#2B1B16") || undefined, color: (tabState.dessert && "#fff") || undefined,} 
                        }
                        onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            setTabState(prev => ({ ...prev, coffee: false, juice: false, dessert: true }))
                        }}>
                        디저트
                    </button>
                </div>

                {/* 주문하기 메뉴 */}
                <MenuTabItems 
                    coffee={tabState.coffee}
                    juice={tabState.juice}
                    dessert={tabState.dessert}
                />
            </div>

            <div className='inner'>
                {/* EVENT */}
                <h2 className='main-title'>EVENT!!</h2>
            </div>
            {/* EventSwiper */}
            <Swiper
                spaceBetween={12}
                slidesPerView={1.3}
                modules={[Autoplay]}
                autoplay={{delay: 1500}}
                speed={1200}
            >
                <SwiperSlide>
                    <Link className='event-swiper-link' href={''}>
                        <img src={iceCoffeeState[0]?.img} alt={iceCoffeeState[0]?.menuname} />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link className='event-swiper-link' href={''}>
                        <img src={iceCoffeeState[0]?.img} alt={iceCoffeeState[0]?.menuname} />
                    </Link>
                </SwiperSlide>
            </Swiper>
        </main>
    );
};

export default MainPage;