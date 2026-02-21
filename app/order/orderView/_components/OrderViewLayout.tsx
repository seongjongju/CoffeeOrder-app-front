'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import LoadingUi from '@/shared/components/loading/LoadingUi';
import { useAppSelector } from '@/store/hook';
import useHistory from '@/features/hooks/order/useHistory';


const OrderViewLayout = () => {
    const params = useParams();
    const router = useRouter();
    const users = useAppSelector(state => state.auth);
    const {isLoading, error, formatDate, orderDetail, fetchOrderDetail} = useHistory();

    useEffect(() => {
        if(!users.user?.id) return;
        fetchOrderDetail(params);
    }, [])

    if (isLoading) return <LoadingUi />;

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

    if (!orderDetail) return;

    return (
        <main className='main order-main'>
            <div className='inner'>
                {orderDetail.items.map(item => (
                    <div className='order-view' key={item._id}>
                        <div className='order-view__intro'>
                            <div className='order-view__heading'>
                                <p className='text-body-1'>주문정보</p>
                                <p className='history__date'>{formatDate(orderDetail.updatedAt)}</p>   
                            </div>
                            <div className='order-view__item'>
                                <p className='text-body'>{item.menuName}</p>
                                <p className='text-body'>{item.price.toLocaleString()}원</p>
                            </div>
                            <div className='order-view__item--total'>
                                <p className='text-body'>{item.count}개</p>
                                <p className='text-body'>{(item.price * item.count).toLocaleString()}원</p>
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
                                    {((item.price * item.count) + 
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