'use client';
import { useAppSelector, useAppDispatch } from '@/app/store/hook';
import { setOption } from '@/features/view/store/optionSlice';
import { useState } from 'react';

const useOptions = () => {
    const { lightly, shot, syrup, whipping, count } = useAppSelector(
        state => state.option
    );
    const dispatch = useAppDispatch();

    //연하게 옵션
    const handleChangelightly = () => {
        dispatch(setOption({ lightly: !lightly }));
    };

    //샷
    const shotIncrement = () => {
        if (shot < 10) dispatch(setOption({ shot: shot + 1 }));
    };

    const shotDecrement = () => {
        if (shot > 0) dispatch(setOption({ shot: shot - 1 }));
    };

    //시럽
    const syrupIncrement = () => {
        if (syrup < 10) dispatch(setOption({ syrup: syrup + 1 }));
    };

    const syrupDecrement = () => {
        if (syrup > 0) dispatch(setOption({ syrup: syrup - 1 }));
    };

    //휘핑크림
    const whippingIncrement = () => {
        if (whipping < 10) dispatch(setOption({ whipping: whipping + 1 }));
    };

    const whippingDecrement = () => {
        if (whipping > 0) dispatch(setOption({ whipping: whipping - 1 }));
    };

    //갯수
    const countIncrement = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(count < 10) dispatch(setOption({ count: count + 1 }));
    };

    const countDecrement = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(count > 1) dispatch(setOption({ count: count - 1 }));
    };

    return {
        handleChangelightly,
        shotIncrement,
        shotDecrement,
        syrupIncrement,
        syrupDecrement,
        whippingIncrement,
        whippingDecrement,
        countIncrement,
        countDecrement,
    }
};

export default useOptions;