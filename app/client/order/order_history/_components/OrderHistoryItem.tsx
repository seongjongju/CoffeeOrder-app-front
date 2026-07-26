'use client';
import { formatCreatedAt, formatPrice } from '@/app/util/format';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface OrderHistoryItemProps {
    orderId: string;
    date: string;
    img: string;
    productName: string;
    amount: number;
};

const OrderHistoryItem = ({
    orderId, 
    date, 
    img, 
    productName,
    amount 
}: OrderHistoryItemProps) => {
    const pathName = usePathname();

    return (
        <div className='order__item'>
            {
                pathName.includes('order') &&
                (
                    <p className='order__date'>{formatCreatedAt(date)}</p>
                )
            }
            <div className='order__top'>
                <figure className='order__img'>
                    <CldImage
                        src={img}
                        width={60}
                        height={60}
                        alt={productName}
                    />
                </figure>
                <div>
                    <p className='order__name'>{productName}</p>
                    <p className='text-body'>{formatPrice(amount)}원 결제</p>
                </div>
            </div> {/* .order__top : end */}
            {
                pathName.includes('/order') ? 
                (
                    <div className='order__btns'> 
                        <Link 
                            href={`/client/order/order_view/${orderId}`}
                            className='order__button view'
                        >
                            상세보기
                        </Link>
                        <button className='common-button order__button'>재주문</button>
                    </div>       
                ) : 
                (
                    <div className='order__btns'> 
                        <button
                            style={{width: "100%"}} 
                            className='common-button order__button'
                        >
                            바로주문
                        </button>
                    </div>  
                )
            }
        </div>
    );
};

export default OrderHistoryItem;