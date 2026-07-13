'use client';
import { formatPrice } from '@/app/util/format';
import Coupon from '@/shared/client/components/coupon/Coupon';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { Item, paymentData } from '@/app/types/pay/pay';
import { payCreateApi } from '@/features/clientApi/payApy';

interface paymentInterfaceProps {
    paymentData: paymentData;
};

const PayInterface = ({paymentData}: paymentInterfaceProps) => {
    console.log(paymentData)

    const items = useSearchParams().get('items');

    const orderItems:Item[] = items ? JSON.parse(items) : []; //주문 정보 배열

    const [finalPrice, setFinalPrice] = useState<number>(
        orderItems.map((item:Item) => item.totalPrice).reduce((acc: number, cur: number) => acc + cur, 0)
    ); //최종 금액(쿠폰 연산 전)

    //결제
    const handlePay = async () => {
        try{
            const data = await payCreateApi(orderItems);

            const payPrice = data?.items.map((item:Item) => item.totalPrice).reduce((acc: number, cur: number) => acc + cur, 0);
            const payProductName = data?.items.length > 1 ? 
                            `${orderItems[0].productName} 외 ${data.items.length - 1}개` :
                            orderItems[0].productName;

            if(typeof window !== "undefined" ) {
                const pay_obj : any = window ;
                const { AUTHNICE } = pay_obj
                console.log(AUTHNICE)

                AUTHNICE.requestPay({
                    clientId: process.env.NEXT_PUBLIC_NICEPAY_CLIENT_ID,
                    method: 'card',
                    orderId: data.orderId,
                    amount: payPrice,
                    goodsName: payProductName,
                    returnUrl: `${process.env.NEXT_PUBLIC_FRONT_API_URL}/api/pay/pay_approve`, //API를 호출할 Endpoint 입력
                    fnError: function (result: any) {
                        alert('고객용메시지 : ' + result.errorMsg + '\n개발자확인용 : ' + result.msg);
                    }
                });
            }

            return;
        }catch(err: any) {
            console.error(err.response?.data?.message);
            return;
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "calc(100vh - 100px)"
            }}
        >
            {
                paymentData.items.map((item: Item) => (
                    <div 
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
                    </div>
                ))
            }

            <Coupon />

            <button 
                className='common-button pay-btn'
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    handlePay()
                }}
            >
                <span>최종 결제 금액 : </span>{formatPrice(paymentData.amount)}원 <span>결제하기</span>
            </button>
        </div>
    );
};

export default PayInterface;