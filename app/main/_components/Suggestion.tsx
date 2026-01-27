'use client';
import useMenu from '@/app/api/hook/useMenu';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import React from 'react';
import Link from 'next/link';

const Suggestion = () => {
    const {iceCoffeeState, hotCoffeeState, juiceState, dessertState} = useMenu();
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
            <SwiperSlide>
                <Link className='menu-swiper-link' href={`/view/${iceCoffeeState[0]?.type}/${iceCoffeeState[0]?.id}`}>
                    <img src={iceCoffeeState[0]?.img} alt={iceCoffeeState[0]?.menuname} />
                    <p>{iceCoffeeState[0]?.menuname}</p>
                </Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link className='menu-swiper-link' href={`/view/${hotCoffeeState[1]?.type}/${hotCoffeeState[1]?.id}`}>
                    <img src={hotCoffeeState[1]?.img} alt={hotCoffeeState[1]?.menuname} />
                    <p>{hotCoffeeState[1]?.menuname}</p>
                </Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link className='menu-swiper-link' href={`/view/${juiceState[0]?.type}/${juiceState[0]?.id}`}>
                    <img src={juiceState[0]?.img} alt={juiceState[0]?.menuname} />
                    <p>{juiceState[0]?.menuname}</p>
                </Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link className='menu-swiper-link' href={`/view/${dessertState[0]?.type}/${dessertState[0]?.id}`}>
                    <img src={dessertState[0]?.img} alt={dessertState[0]?.menuname} />
                    <p>{dessertState[0]?.menuname}</p>
                </Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link className='menu-swiper-link' href={`/view/${iceCoffeeState[1]?.type}/${iceCoffeeState[1]?.id}`}>
                    <img src={iceCoffeeState[1]?.img} alt={iceCoffeeState[1]?.menuname} />
                    <p>{iceCoffeeState[1]?.menuname}</p>
                </Link>
            </SwiperSlide>
        </Swiper>
    );
};

export default Suggestion;