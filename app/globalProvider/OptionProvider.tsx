'use client';
import React, { useEffect } from 'react';
import { resetOption, setOption } from '@/features/view/store/optionSlice';
import useMenu from '../../features/menu/hook/useMenu';
import { useParams } from 'next/navigation';
import { useAppDispatch } from '../store/hook';

const OptionProvider = () => {
    const {menus} = useMenu();
    const params = useParams();
    const dispatch = useAppDispatch();

    //타입 필터
    const menuTypeFiltered = menus.filter(menu => menu.type === params.type)

    //타입이 일치하면 고유 아이디 찾기
    const menuIdFind = menuTypeFiltered.find(menu => menu.id === Number(params.id));

    useEffect(() => {
        if (!menus || menus.length === 0) return;

        dispatch(resetOption());

        dispatch(setOption({
            price: menuIdFind?.price
        }));
    }, [menus, params.type, params.id, dispatch]);

    return null;
};

export default OptionProvider;