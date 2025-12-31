'use client';
import { useAppSelector } from '@/app/store/hook';
import { RootState } from '@/app/store/store';
import React, { useEffect, useState } from 'react';

const useCartQuantity = () => {
    const [cartItemQuantity, setCartItemQuantity] = useState<number | null>(0);
    const [cartTotalCount, setCartTotalCount] = useState<number | null>(0)
    const cartItems = useAppSelector((state: RootState) => state.cart); //장바구니 메뉴 배열

    console.log(cartItemQuantity)

    //전체 메뉴의 갯수
    const cartItemLength = cartItems.items.length;

    //각 메뉴의 count
    const cartItemCount = cartItems.items.map(i => i.count);

    //전체 count의 합
    const totalCount = cartItemCount.length !== 0 ? cartItemCount.reduce((i, j) => (i + j)) : null;

    useEffect(() => {
        //장바구니에 있는 전체 메뉴 갯수
        setCartItemQuantity(cartItemLength);
    }, [cartItems]);

    useEffect(() => {
        setCartTotalCount(totalCount)
    }, [cartItems])

    return {cartItems, cartItemQuantity, cartTotalCount}
};

export default useCartQuantity;