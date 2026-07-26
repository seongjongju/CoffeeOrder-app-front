import React from 'react';
import '@/shared/client/styled/order/order.css';
import OrderViewList from '../_components/OrderViewList';

const OrderViewpage = async ({ params }: {params : Promise<{ orderId: string; }>}) => {
    const {orderId} = await params;

    return (
        <main className='main order-main'>
            <nav className='inner'>
                <OrderViewList 
                    orderIdParams={orderId}
                />
            </nav>
        </main>
    );
};

export default OrderViewpage;