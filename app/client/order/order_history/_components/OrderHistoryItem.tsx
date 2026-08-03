'use client';
import { OrderItem } from '@/app/types/orders/orders';
import { formatCreatedAt, formatPrice } from '@/app/util/format';
import useModalShow from '@/features/hooks/modal/useModalShow';
import usePayment from '@/features/hooks/pay/usePayment';
import Modal from '@/shared/client/components/modal/Modal';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface OrderHistoryItemProps {
    item: OrderItem;
};

const OrderHistoryItem = ({item}: OrderHistoryItemProps) => {
    const pathName = usePathname();
    const {modalShow, setModalShow, modalText, setModalText} = useModalShow(); //모달창

    //결제 커스텀 훅
    const items = [
        {
            _id: item._id ,
            userId: item.userId,
            userName: item.userName,
            productCode: item.items[0].productCode,
            img: item.items[0].img,
            productName: item.productName,
            price: item.items[0].price,
            totalPrice: item.items[0].totalPrice,
            totalCount: item.items[0].totalCount,
            lightly: item.items[0].lightly,
            addPrice: item.items[0].addPrice,
            usedInventorys: item.items[0].usedInventorys,
        }
    ];
    const {addPayment} = usePayment(items, "reorder");

    return (
        <div className='order__item'>
            {
                pathName.includes('order') &&
                (
                    <p className='order__date'>{formatCreatedAt(item.createdAt)}</p>
                )
            }
            <div className='order__top'>
                <figure className='order__img'>
                    <CldImage
                        src={item.items[0].img.publicId}
                        width={60}
                        height={60}
                        alt={item.productName}
                    />
                </figure>
                <div>
                    <p className='order__name'>{item.productName}</p>
                    <p className='text-body'>{formatPrice(item.amount)}원 결제</p>
                </div>
            </div> {/* .order__top : end */}
            {
                pathName.includes('/order') ? 
                (
                    <div className='order__btns'> 
                        <Link 
                            href={`/client/order/order_view/${item.orderId}`}
                            className='order__button view'
                        >
                            상세보기
                        </Link>
                    </div>       
                ) : 
                (
                    <div className='order__btns'> 
                        <Link 
                            href={`/client/order/order_view/${item.orderId}`}
                            className='order__button view'
                        >
                            상세보기
                        </Link>
                        <button
                            className='common-button order__button'
                            onClick={addPayment}
                        >
                            바로주문
                        </button>
                    </div>  
                )
            }

            {
                modalShow &&
                <Modal 
                    modalText={modalText}
                    modalShow={modalShow}
                    setModalText={setModalText}
                    setModalShow={setModalShow}
                />
            }
        </div>
    );
};

export default OrderHistoryItem;