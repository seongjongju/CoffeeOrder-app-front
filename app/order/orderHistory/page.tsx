import '@/shared/styled/order/order.css';
import { cookies } from 'next/headers';
import OrderHisyoryList from './_components/OrderHisyoryList';
import { orderApi } from '@/features/services/order/order.services';

const OrderHistoryPage = async () => {
    const cookieStore = await cookies();
    const orderHistory = await orderApi.getOrderHistory(cookieStore);

    return (
        <OrderHisyoryList orderHistory={orderHistory} />
    );
};

export default OrderHistoryPage