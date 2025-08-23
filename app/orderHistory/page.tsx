import OrderHistoryListItems from '@/features/orderHistory/components/OrderHistoryListItems';
import React from 'react';

const OrderHistoryPage = () => {
    return (
        <main>
            <section>
                <div className='inner'>
                    <h2 className='sub_title'>주문 내역</h2>
                    <OrderHistoryListItems />
                    <OrderHistoryListItems />
                </div> {/* inner */}
            </section>
        </main>
    );
};

export default OrderHistoryPage;