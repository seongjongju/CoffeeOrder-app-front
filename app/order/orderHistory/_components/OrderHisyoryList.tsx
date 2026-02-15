'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import LoadingUi from '@/shared/components/loading/LoadingUi';
import Image from 'next/image';
import mascot from '@/public/images/mascot.png';

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

const OrderHistoryList = () => {
    const router = useRouter();
    const [orderHistory, setOrderHistory] = useState<HistorysType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/myOrder`,
                    {
                        headers: {
                            'ngrok-skip-browser-warning': 'true'
                        },
                        withCredentials: true
                    }
                );
                setOrderHistory(data);
            } catch (err: any) {
                console.error('주문 내역 로딩 실패:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}.${month}.${day}`;
    };

    if (isLoading) {
        return <LoadingUi />;
    }

    return (
        <main className={orderHistory.length !== 0 ? 'main order-main' : 'main cart-null'}>
            <div className='inner'>
                {orderHistory.length === 0 ? (
                    <div className='cart-null__ui'>
                        <Image src={mascot} alt='마스코트' />
                        <p className='cart-null__text'>주문내역이 없습니다!!</p>
                    </div>
                ) : (
                    <div className='history'>
                        {orderHistory.map((his) => (
                            <div key={his.paymentId} className='history__item'>
                                <p className='history__date'>
                                    {formatDate(his.paidAt)}
                                </p>
                                {his.items && his.items.length > 1 ? (
                                    <div className='history__top'>
                                        <div className='history__img'>
                                            <img src={his.items[0].img} alt={his.items[0].name} className='history__image' />
                                        </div>
                                        <div className='history__detail'>
                                            <p className='history__name'>{his.items[0].name} 외 {his.items.length - 1}개</p>
                                            <p className='history__pay'>{his.totalPrice.toLocaleString()}원 결제</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='history__top'>
                                        <div className='history__img'>
                                            <img src={his.items[0].img} alt={his.items[0].name} className='history__image' />
                                        </div>
                                        <div className='history__detail'>
                                            <p className='history__name'>{his.items[0].name}</p>
                                            <p className='history__pay'>{his.totalPrice.toLocaleString()}원 결제</p>
                                        </div>
                                    </div>
                                )}
                                <div className='history__btns'>
                                    <button 
                                        className='history__button view'
                                        onClick={() => {
                                            router.push(`/order/orderView/${his._id}/${formatDate(his.paidAt)}`);
                                        }}
                                    >
                                        주문상세
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default OrderHistoryList;