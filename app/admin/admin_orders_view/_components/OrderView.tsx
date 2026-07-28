import { OrderItem, Orders } from '@/app/types/orders/orders';
import { formatPrice } from '@/app/util/format';
import React from 'react';

interface OrderViewProps {
    orders: Orders['result'];
    params?: string;
};

const OrderView = ({orders, params}: OrderViewProps) => {
    const findOrdersItems = orders.find((order: OrderItem) => order.orderId === params)?.items;
    
    return (
        <ul>
            {
                findOrdersItems?.map((item) => {
                    return (
                        <li 
                            key={item._id}
                            className='order__item'
                        >
                            <p className='order__heading'>주문정보</p>
                            <div className='order__product'>
                                <p className='text-body'>{item.productName}</p>
                                <p className='text-body'>{item.price}원 x {item.totalCount}</p>
                            </div> {/* .order__product : end */}
                            {
                                item.addPrice.find((option) => option.count > 0) || item.lightly ?
                                (
                                    <>
                                        <p className='order__heading'>선택옵션</p>
                                        <ul className='order__list'>
                                            <li className='order__li'>
                                                <p className='text-body'>
                                                    {
                                                        item.lightly ? "연하게" : ""
                                                    }
                                                </p>
                                            </li> {/* .order__li : end */}
                                            {
                                                item.addPrice.map((option) => {
                                                    if(option.count === 0) return;
    
                                                    return(
                                                        <li 
                                                            key={option.id}
                                                            className='order__li'
                                                        >
                                                            <p className='text-body'>{option.label}</p>
                                                            <p className='text-body'>{`500 x ${option.count}`}</p>
                                                        </li> 
                                                    )
                                                })
                                            }
                                        </ul> {/* .order__list : end */}
                                    </>                                
                                ) : 
                                null
                            }
                            <div className='order__total'>
                                <p className='text-body'>총 금액</p>
                                <p className='order__total-price'>{formatPrice(item.totalPrice)}원</p>
                            </div> {/* .order__total : end */}
                        </li>
                    )
                })
            }
        </ul>
    );
};

export default OrderView;