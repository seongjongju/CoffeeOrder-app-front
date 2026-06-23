import { CartGetType } from '@/app/types/carts/carts';
import { getCartApi } from '@/features/clientApi/cartApi';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const useCartQuery = () => {
    const cartQuery = useQuery<CartGetType>({
        queryKey: ['carts'],
        queryFn: getCartApi,
    });

    const allCarts = cartQuery.data;
    const carts = allCarts?.result;

    return {
        carts: carts || [],
    };
};

export default useCartQuery;