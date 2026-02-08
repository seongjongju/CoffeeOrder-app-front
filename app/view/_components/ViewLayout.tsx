'use client';
import React from 'react';
import ViewThum from './ViewThum';
import useMenu from '@/features/hooks/menu/useMenu';
import { useParams } from 'next/navigation';
import LoadingUi from '@/shared/components/loading/LoadingUi';
import useLoading from '@/features/hooks/loading/useLoading';
import ViewOptions from './ViewOptions';
import OrderBar from './OrderBar';
import ViewDetail from './ViewDetail';

export type infoType = {
    caffeine: number,
    calorie: number,
    carbohydrate: number,
    fat: number,
    protein: number,
    saturatedfat: number,
    sodium: number,
    sugar: number,
    volume: number
}

const ViewLayout = () => {
    const {isLoading} = useLoading();
    const {menus} = useMenu(); // 메뉴 커스텀 훅
    const params = useParams();

     //타입 필터
    const menuTypeFiltered = menus.filter(menu => menu.type === params.type)

    //타입이 일치하면 고유 아이디 찾기
    const menuIdFind = menuTypeFiltered.find(menu => menu.id === Number(params.id));

    {
        if(menuIdFind === undefined || isLoading) 
        return (<LoadingUi />)
    }

    return (
        <>
            <div className='inner'>
                <ViewThum 
                    thum={menuIdFind.img}
                    menuName={menuIdFind.menuname}
                />

                <ViewOptions 
                    type={menuIdFind.type}
                />

                <ViewDetail 
                    info={menuIdFind.info}
                    origin={menuIdFind.origin}
                />
            </div>

            <OrderBar 
                menuName={menuIdFind.menuname}
                img={menuIdFind.img}
                menuId={menuIdFind.id}
            />
        </>
    );
};

export default ViewLayout;