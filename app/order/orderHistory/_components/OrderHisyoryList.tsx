'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingUi from '@/shared/client/components/loading/LoadingUi';
import Image from 'next/image';
import mascot from '@/public/images/mascot.png';
import { useAppSelector } from '@/store/hook';
import useHistory from '@/features/hooks/order/useHistory';

const OrderHistoryList = () => {
    const router = useRouter();
    const users = useAppSelector(state => state.auth);
    const {isLoading, formatDate, orderHistory, fetchOrders} = useHistory();

    useEffect(() => {
        if(!users.user?.id) return;
        fetchOrders();
    }, [])

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
                                                <img src={firstItem.img} alt={firstItem.menuName} className='history__image' />
                                            ) : (
                                                <div className="no-img">이미지 없음</div>
                                            )}
                                        </div>
                                        <div className='history__detail'>
                                            <p className='history__name'>
                                                {firstItem ? (
                                                    his.items.length > 1 ? `${firstItem.menuName} 외 ${his.items.length - 1}개` : firstItem.menuName
                                                ) : "주문 상품 정보 없음"}
                                            </p>
                                            <p className='history__pay'>{his.totalPrice?.toLocaleString() || 0}원 결제</p>
                                        </div>
                                    </div>

                                    <div className='history__btns'>
                                        <button 
                                            className='history__button view'
                                            onClick={() => router.push(`/order/orderView/${his._id}`)}
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