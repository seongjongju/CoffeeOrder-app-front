'use client';
import { useParams } from 'next/navigation';
import React from 'react';

interface OptionsType {
    lightly: boolean;
    shot: number;
    syrup: number;
    whipping: number;
}

interface OrderItem {
    id: string; 
    name: string;
    price: number;
    productId: string;
    quantity: number;
    options: OptionsType;
}

interface HistorysType {
    paymentId: string;
    totalPrice: number;
    items: OrderItem[];
    paidAt: string;
    _id: string;
}

interface OrderHistoryListProps {
    orderHistory: HistorysType[];
}

const OrderViewLayout = ({orderHistory}:OrderHistoryListProps) => {
    const params = useParams();

    const filteredHistory = orderHistory.filter(his => his._id === params.id);
    console.log(filteredHistory[0].items)

    return (
        <main className='main order-main'>
            <div className='inner'>
                {
                    filteredHistory[0].items.map(item => (
                        <div className='order-view' key={item.productId}>
                            <div className='order-view__intro'>
                                <div className='order-view__heading'>
                                    <p className='text-body-1'>주문정보</p>
                                    <p className='history__date'>{params.paidAt}</p>   
                                </div>
                                <div className='order-view__item'>
                                    <p className='text-body'>{item.name}</p>
                                    <p className='text-body'>{item.price.toLocaleString()}원</p>
                                </div>
                                <div className='order-view__item--total'>
                                    <p className='text-body'>{item.quantity}개</p>
                                    <p className='text-body'>{(item.price * item.quantity).toLocaleString()}원</p>
                                </div>
                                {
                                    item.options.lightly ||
                                    item.options.shot > 0 ||
                                    item.options.syrup > 0 ||
                                    item.options.whipping > 0 ? 
                                    (
                                        <div className='order-view__heading'>
                                            <p className='text-body-1'>선택옵션</p>  
                                        </div>
                                    ) : null
                                }
                                <ul className='order-view__list'>
                                    <li className='order-view__li'>
                                        <p className='text-body'>{item.options.lightly && "연하게"}</p>
                                    </li>
                                    <li className='order-view__li'>
                                        <p className='text-body'>{item.options.shot > 0 ? "샷추가" : ""}</p>
                                        <p className='text-body'>
                                            {
                                                item.options.shot > 0 ? (item.options.shot * 500).toLocaleString() + "원" :
                                                ""
                                            }
                                        </p>
                                    </li>
                                    <li className='order-view__li'>
                                        <p className='text-body'>{item.options.syrup > 0 ? "시럽추가" : ""}</p>
                                        <p className='text-body'>
                                            {
                                                item.options.shot > 0 ? (item.options.syrup * 500).toLocaleString() + "원":
                                                ""
                                            }
                                        </p>
                                    </li>
                                    <li className='order-view__li'>
                                        <p className='text-body'>{item.options.whipping > 0 ? "휘핑크림 추가" : ""}</p>
                                        <p className='text-body'>
                                            {
                                                item.options.shot > 0 ? (item.options.whipping * 500).toLocaleString() + "원" :
                                                ""
                                            }
                                        </p>
                                    </li>
                                </ul>
                                <div className='order-view__total'>
                                    <p className='text-body-1'>최종 결제 금액</p>
                                    <p className='order-view__total-price'>
                                        {
                                            ((item.price * item.quantity) + 
                                            (item.options.shot * 500) +
                                            (item.options.syrup * 500) + 
                                            (item.options.whipping * 500)).toLocaleString() + "원"
                                        }
                                    </p>
                                </div>
                            </div> 
                        </div>
                    ))
                }
            </div>
        </main>
    );
};

export default OrderViewLayout;