import React from 'react';
import orderHistoryStyles from '../orderHistory.module.css';
import buttonStyles from '@/shared/components/Form/Button/Button.module.css';
import Image from 'next/image';
import locationIco from '@/shared/assets/images/ico/location_ico.svg';
import newHotImg1 from '@/shared/assets/images/contents/newhot_img1.svg';

const OrderHistoryListItems = () => {
    return (
        <div className={orderHistoryStyles.order_history_item}>
            <div className={orderHistoryStyles.order_history_store_date}>
                <p className={orderHistoryStyles.order_history_store}>
                    <Image src={locationIco} alt="로케이션 표시" />
                    매장명
                </p>
                <p className='date'>2025.08.23</p>
            </div>
            <div className={orderHistoryStyles.order_history_orders}>
                <div className={orderHistoryStyles.order_history_image}>
                    <Image src={newHotImg1} alt="제품명" />
                </div>
                <div className={orderHistoryStyles.order_history_info}>
                    <p className={orderHistoryStyles.orders_productname}>제품명</p>
                    <p className={orderHistoryStyles.orders_price}>4,000원</p>
                </div>
            </div>
            <button className={buttonStyles.common_button_short}>주문상세</button>
        </div>
    );
};

export default OrderHistoryListItems;