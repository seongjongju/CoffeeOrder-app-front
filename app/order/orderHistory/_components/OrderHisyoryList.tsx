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
    createdAt: string; // 💡 paidAt -> createdAt 으로 변경 (백엔드 필드명 일치)
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
                        headers: { 'ngrok-skip-browser-warning': 'true' },
                        withCredentials: true
                    }
                );
                console.log("받아온 데이터:", data); // 💡 데이터 확인용
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
        if (!dateString) return "날짜 없음";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "날짜 오류";
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    if (isLoading) return <LoadingUi />;

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
                        {orderHistory.map((his) => {
                            const firstItem = his.items && his.items.length > 0 ? his.items[0] : null;
                            const displayDate = formatDate(his.createdAt);

                            return (
                                <div key={his._id} className='history__item'>
                                    <p className='history__date'>{displayDate}</p>
                                    
                                    <div className='history__top'>
                                        <div className='history__img'>
                                            {firstItem ? (
                                                <img src={firstItem.img} alt={firstItem.name} className='history__image' />
                                            ) : (
                                                <div className="no-img">이미지 없음</div>
                                            )}
                                        </div>
                                        <div className='history__detail'>
                                            <p className='history__name'>
                                                {firstItem ? (
                                                    his.items.length > 1 ? `${firstItem.name} 외 ${his.items.length - 1}개` : firstItem.name
                                                ) : "주문 상품 정보 없음"}
                                            </p>
                                            <p className='history__pay'>{his.totalPrice?.toLocaleString() || 0}원 결제</p>
                                        </div>
                                    </div>

                                    <div className='history__btns'>
                                        <button 
                                            className='history__button view'
                                            onClick={() => router.push(`/order/orderView/${his._id}/${displayDate}`)}
                                        >
                                            주문상세
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
};

export default OrderHistoryList;