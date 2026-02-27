'use client';
import { useAppSelector } from '@/store/hook';
import React, { useMemo } from 'react';

const useAlert = () => {
    const alert = useAppSelector(state => state.alert);

    const alertItems = useMemo(() => {
        return [...alert.items].sort((a, b) => {
            const idA = String(a.alertId || '');
            const idB = String(b.alertId || '');
            
            return idB.localeCompare(idA);
        });
    }, [alert.items]);

    return {alertItems};
};

export default useAlert;