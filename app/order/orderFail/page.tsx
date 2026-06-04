import React from 'react';
import '@/shared/client/styled/order/order.css';
import OrderErrorUi from '../_components/OrderErrorUi';

const OrderFailpage = () => {
    return (
        <OrderErrorUi 
            errorExplanation='결제 실패'
            errorText='메인으로 돌아가기'
            routerPage='/main'
        />
    );
};

export default OrderFailpage;