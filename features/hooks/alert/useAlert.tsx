'use client';
import { useAppSelector } from '@/store/hook';
import React from 'react';

const useAlert = () => {
    const user = useAppSelector(state => state.auth.user); //유저 목록
    const alert = useAppSelector(state => state.alert.items); //알람 내역

    //해당 유저의 알림만 불러옴
    const userAlerts = alert.filter(al => al.userId === user?.userId);

    return {userAlerts}
};

export default useAlert;