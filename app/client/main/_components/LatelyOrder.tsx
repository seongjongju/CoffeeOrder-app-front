'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '@/shared/client/styled/order/order.css';
import useOrderQuery from '@/features/hooks/query/useOrderQuery';
import OrderHistoryItem from '../../order/order_history/_components/OrderHistoryItem';
import { useAppSelector } from '@/store/hook';

const LatelyOrder = () => {
    const {orders} = useOrderQuery();
    const user = useAppSelector(state => state.auth.user); //유저 목록
    const userOrders = orders.filter(order => order.userId === user.userId);

    return (
        <>
            {
                userOrders.length > 0 &&
                (
                    <div className='inner'>
                        <h2 className='main-title'>최근 주문한 메뉴!!</h2> 
                    </div>
                )
            }
            <Swiper
                spaceBetween={12}
                slidesPerView={1.3}
                speed={1200}
                style={{
                    marginBottom: '20px'
                }}
            >
                {
                    userOrders.map((item) => {
                        const img = item.items[0].img.publicId;
                        return (
                            <SwiperSlide
                                key={item.orderId}
                            >
                                <OrderHistoryItem 
                                    key={item._id}
                                    orderId={item.orderId}
                                    date={item.createdAt}
                                    img={img}
                                    productName={item.productName}
                                    amount={item.amount}
                                />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </>
    );
};

export default LatelyOrder;