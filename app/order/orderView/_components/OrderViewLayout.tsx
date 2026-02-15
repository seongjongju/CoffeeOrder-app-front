'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingUi from '@/shared/components/loading/LoadingUi';

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

const OrderViewLayout = () => {
    const params = useParams();
    const router = useRouter();
    const [orderDetail, setOrderDetail] = useState<HistorysType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrderDetail = async () => {
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

                // 해당 ID의 주문 찾기
                const filteredHistory = data.find((his: HistorysType) => his._id === params.id);
                
                if (!filteredHistory) {
                    setError('주문 정보를 찾을 수 없습니다.');
                    return;
                }

                setOrderDetail(filteredHistory);
            } catch (err: any) {
                console.error('주문 상세 로딩 실패:', err);
                if (err.response?.status === 401) {
                    setError('로그인이 필요합니다.');
                } else {
                    setError('주문 정보를 불러올 수 없습니다.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderDetail();
    }, [params.id]);

    if (isLoading) {
        return <LoadingUi />;
    }

    if (error) {
        return (
            <main className='main cart-null'>
                <div className='inner'>
                    <p>{error}</p>
                    <button 
                        onClick={() => router.push('/order/orderHistory')}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            background: '#333',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        주문 내역으로 돌아가기
                    </button>
                </div>
            </main>
        );
    }

    if (!orderDetail) {
        return            
    }

    return (
        <main className='main order-main'>
            <div className='inner'>
                {orderDetail.items.map(item => (
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
                            {(item.options.lightly ||
                                item.options.shot > 0 ||
                                item.options.syrup > 0 ||
                                item.options.whipping > 0) && (
                                <div className='order-view__heading'>
                                    <p className='text-body-1'>선택옵션</p>  
                                </div>
                            )}
                            <ul className='order-view__list'>
                                {item.options.lightly && (
                                    <li className='order-view__li'>
                                        <p className='text-body'>연하게</p>
                                    </li>
                                )}
                                {item.options.shot > 0 && (
                                    <li className='order-view__li'>
                                        <p className='text-body'>샷추가</p>
                                        <p className='text-body'>
                                            {(item.options.shot * 500).toLocaleString()}원
                                        </p>
                                    </li>
                                )}
                                {item.options.syrup > 0 && (
                                    <li className='order-view__li'>
                                        <p className='text-body'>시럽추가</p>
                                        <p className='text-body'>
                                            {(item.options.syrup * 500).toLocaleString()}원
                                        </p>
                                    </li>
                                )}
                                {item.options.whipping > 0 && (
                                    <li className='order-view__li'>
                                        <p className='text-body'>휘핑크림 추가</p>
                                        <p className='text-body'>
                                            {(item.options.whipping * 500).toLocaleString()}원
                                        </p>
                                    </li>
                                )}
                            </ul>
                            <div className='order-view__total'>
                                <p className='text-body-1'>최종 결제 금액</p>
                                <p className='order-view__total-price'>
                                    {((item.price * item.quantity) + 
                                      (item.options.shot * 500) +
                                      (item.options.syrup * 500) + 
                                      (item.options.whipping * 500)).toLocaleString()}원
                                </p>
                            </div>
                        </div> 
                    </div>
                ))}
            </div>
        </main>
    );
};

export default OrderViewLayout;