'use client';
import { orderApi } from '@/features/services/order/order.services';
import { useAppSelector } from '@/store/hook';
import React, { useState } from 'react';

interface OrderItem {
    _id: string; 
    id: string; 
    menuName: string;
    img: string;
    price: number;
    count: number;
    options: OptionsType;
}

interface HistorysType {
    paymentId: string;
    totalPrice: number;
    items: OrderItem[];
    createdAt: string;
    updatedAt: string;
    _id: string;
}

interface OptionsType {
    lightly: boolean;
    shot: number;
    syrup: number;
    whipping: number;
}

const useHistory = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [orderHistory, setOrderHistory] = useState<HistorysType[]>([]);
    const [orderDetail, setOrderDetail] = useState<HistorysType | null>(null);
    const [error, setError] = useState('');
    const users = useAppSelector(state => state.auth);

    const formatDate = (dateString: string) => {
        if (!dateString) return "날짜 없음";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "날짜 오류";
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    const fetchOrders = async () => {
        try {
            setIsLoading(true)
            const data = await orderApi.getOrderHistory(users.user?.id);
            setOrderHistory(data);
        } catch (err: any) {
            console.error('주문 내역 로딩 실패:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchOrderDetail = async (params: any) => {
        try {
            setIsLoading(true);

            const data = await orderApi.getOrderHistory(users.user?.id);

            // 해당 ID의 주문 찾기
            const filteredHistory = data.find((his: HistorysType) => his._id === params._id);
            
            if (!filteredHistory) {
                setError('주문 정보를 찾을 수 없습니다.');
                return;
            }

            setOrderDetail(filteredHistory);
        } catch (err: any) {
            console.error('주문 상세 로딩 실패:', err);
            if (err.response?.status === 401) {
                setError('로그인이 필요합니다.');
            } else {
                setError('주문 정보를 불러올 수 없습니다.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        error,
        formatDate,
        orderHistory,
        fetchOrders,
        fetchOrderDetail,
        orderDetail
    }
};

export default useHistory;