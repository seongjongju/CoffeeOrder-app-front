'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface OrderItem {
    id: string; 
    name: string;
    img: string;
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

const OrderHisyoryList = ({ orderHistory }:OrderHistoryListProps) => {
    const route = useRouter();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}.${month}.${day}`;
    };

    return (
        <main className={orderHistory.length !== 0 ? 'main order-main' : 'main cart-null'}>
            <div className='inner'>
                <div className='history'>
                    {
                        orderHistory.map((his) => (
                            <div key={his.paymentId} className='history__item'>
                                <p className='history__date'>
                                    {formatDate(his.paidAt)}
                                </p>
                                {   
                                    his.items &&
                                    his.items.length > 1 ?
                                    (
                                        <div className='history__top'>
                                            <div className='history__img'>
                                                <img src={his.items[0].img} alt={his.items[0].name} className='history__image' />
                                            </div>
                                            <div className='history__detail'>
                                                <p className='history__name'>{his.items[0].name} 외 {his.items.length - 1}개</p>
                                                <p className='history__pay'>{his.totalPrice.toLocaleString()}원 결제</p>
                                            </div>
                                        </div>
                                    ) : 
                                    (
                                        <div className='history__top'>
                                            <div className='history__img'>
                                                <img src={his.items[0].img} alt={his.items[0].name} className='history__image' />
                                            </div>
                                            <div className='history__detail'>
                                                <p className='history__name'>{his.items[0].name}</p>
                                                <p className='history__pay'>{his.totalPrice.toLocaleString()}원 결제</p>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className='history__btns'>
                                    <button 
                                        className='history__button view'
                                        onClick={() => {
                                            route.push(`/order/orderView/${his._id}/${formatDate(his.paidAt)}`);
                                        }}
                                    >
                                        주문상세
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div> {/* history */}
            </div>
        </main>
    );
};

export default OrderHisyoryList;