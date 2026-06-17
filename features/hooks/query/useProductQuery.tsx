import { ProductGetType } from '@/app/types/products/product';
import { productGetApi } from '@/features/adminApi/adminProductApi';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const useProductQuery = () => {
    const productQuery = useQuery<ProductGetType>({
        queryKey: ['products'],
        queryFn: productGetApi,
    });

    const allProduct = productQuery.data;
    const products = allProduct?.products;

    return {
        products: products || [],
    };
};

export default useProductQuery;