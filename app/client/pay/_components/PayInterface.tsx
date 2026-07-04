'use client';
import { formatPrice } from '@/app/util/format';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const PayInterface = () => {
    const order = useSearchParams().get('order');
    const items = useSearchParams().get('items');

    const orderItems:any = items ? JSON.parse(items) : []; //주문 정보 배열

    return (
        <>
            {
                orderItems.map((item: any) => (
                    <div 
                        key={item._id}
                        className='order__item'
                    >
                        <p className='order__heading'>주문정보</p>
                        <div className='order__product'>
                            <p className='text-body'>{item.productName}</p>
                            <p className='text-body'>{item.price}원</p>
                        </div> {/* .order__product : end */}
                        
                        {
                            item.addPrice.find((option:any) => option.count > 0) || item.lightly ?
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
                                            item.addPrice.map((option: any) => {
                                                if(option.count === 0) return;

                                                return(
                                                    <li 
                                                        key={option.id}
                                                        className='order__li'
                                                    >
                                                        <p className='text-body'>{option.label}</p>
                                                        <p className='text-body'>{`500 x ${option.count}`}
                                                        </p>
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
                    </div>
                ))
            }

            <p className='order__heading'>쿠폰 사용</p>
            <select name="" id="">
                <option value="">사용 가능한 쿠폰 2개</option>
            </select>
        </>
    );
};

export default PayInterface;