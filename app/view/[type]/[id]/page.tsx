'use client';
import useMenu from '@/features/hooks/menu/useMenu';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import '@/shared/styled/view/view.css';
import '@/shared/styled/policyStyle/policyStyle.css';
import plusIco from '@/public/icons/view_plus.svg';
import minusIco from '@/public/icons/view_minus.svg';
import OrderBar from '../../_components/OrderBar';
import useOptions from '@/features/hooks/view/useOptions';
import { useAppSelector } from '@/store/hook';
import LoadingUi from '@/shared/components/loading/LoadingUi';
import useLoading from '@/features/hooks/loading/useLoading';
import ViewLayout from '../../_components/ViewLayout';

const ViewPage = () => {
    const {isLoading} = useLoading();
    const params = useParams();
    //const {menus} = useMenu(); // 메뉴 커스텀 훅
    //const { lightly, shot, syrup, whipping } = useAppSelector(state => state.option);
    //옵션 선택 커스텀 훅
    // const {
    //     handleChangelightly,
    //     shotIncrement,
    //     shotDecrement,
    //     syrupIncrement,
    //     syrupDecrement,
    //     whippingIncrement,
    //     whippingDecrement,
    // } = useOptions();

    //타입 필터
    //const menuTypeFiltered = menus.filter(menu => menu.type === params.type)

    //타입이 일치하면 고유 아이디 찾기
   // const menuIdFind = menuTypeFiltered.find(menu => menu.id === Number(params.id));

    /* {
        if(menuIdFind === undefined || isLoading) 
        return (<LoadingUi />)
    } */
    
    return (
        <main className='main' style={{ paddingBottom: "0" }}>
            <ViewLayout />
        </main>
    );
};

export default ViewPage;