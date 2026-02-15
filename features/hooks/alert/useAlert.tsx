'use client';
import { useAppSelector } from '@/store/hook';
import React from 'react';

const useAlert = () => {
    const alert = useAppSelector(state => state.alert);
    const alertItems = alert.items;

    return {alertItems};
};

export default useAlert;