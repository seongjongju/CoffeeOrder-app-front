import OrderHistoryListItems from '@/features/orderHistory/components/OrderHistoryListItems';
import React from 'react';

const OrderHistoryPage = () => {
    return (
        <main>
            <section>
                <div className='inner'>
                    <OrderHistoryListItems />
                    <OrderHistoryListItems />
                </div> {/* inner */}
            </section>
        </main>
    );
};

export default OrderHistoryPage;