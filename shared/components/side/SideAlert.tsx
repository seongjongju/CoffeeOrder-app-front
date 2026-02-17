'use client';
import React, { useEffect, useState } from 'react';
import '@/shared/styled/sideGnb/sideGnb.css';
import useAlert from '@/features/hooks/alert/useAlert';
import { useAppDispatch } from '@/store/hook';
import { allDeleteAlert } from '@/store/alert/alertSlice';

interface CategorySideGnbOnProps {
    sideAlertOn: boolean;
    setSideAlertOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideAlert = ({sideAlertOn, setSideAlertOn}:CategorySideGnbOnProps) => {
    const dispatch = useAppDispatch();
    const {alertItems} = useAlert();

    return (
        <div 
            className='side-gnb-container'
            style={{ right: sideAlertOn ? "0" : "-300px" }}
        >
            <div className='side-gnb side-alert'>
                <button className='side-gnb-close-btn'
                    onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        setSideAlertOn(false);
                    }}
                >
                    <span></span>
                    <span></span>
                </button>
                
                <button className='all-delete'
                    onClick={() => {
                        dispatch(allDeleteAlert());
                    }}
                >
                    알림창 비우기
                </button>
                {   
                    alertItems.map((item) => (
                        <ul key={item.alertId} className='alerts'>
                            <li className='alerts__li'>
                                {item.menuName} 주문 완료!!
                            </li>
                            <li className='alerts__li'>
                                주문하신 {item.menuName} 준비되었습니다!!
                            </li>
                        </ul>
                    ))
                }
            </div>
        </div>
    );
};

export default SideAlert;