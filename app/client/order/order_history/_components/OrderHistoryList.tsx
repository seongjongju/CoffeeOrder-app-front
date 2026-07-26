'use client';
import useOrderQuery from '@/features/hooks/query/useOrderQuery';
import React from 'react';
import OrderHistoryItem from './OrderHistoryItem';
import { useAppSelector } from '@/store/hook';
import OrderItemNone from './OrderItemNone';

const OrderHistoryList = () => {
    const {orders} = useOrderQuery();
    const user = useAppSelector(state => state.auth.user); //유저 목록
    const userOrders = orders.filter(order => order.userId === user.userId);

    return (
        <div className={`inner ${userOrders.length === 0 ? "order-null" : ""}`}>
            {
                userOrders.length > 0 ?
                (
                    <ul>
                        {
                            userOrders.map((item) => {
                                const img = item.items[0].img.publicId;
                                return (
                                    <OrderHistoryItem 
                                        key={item._id}
                                        orderId={item.orderId}
                                        date={item.createdAt}
                                        img={img}
                                        productName={item.productName}
                                        amount={item.amount}
                                    />
                                )
                            })
                        }
                    </ul>
                ) : 
                (
                    <OrderItemNone />
                )
            }
        </div>
    );
};

export default OrderHistoryList;