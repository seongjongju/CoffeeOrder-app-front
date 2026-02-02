import React from 'react';
import '@/shared/styled/sideGnb/sideGnb.css';
import Link from 'next/link';

interface CategorySideGnbOnProps {
    sideAlertOn: boolean;
    setSideAlertOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideAlert = ({sideAlertOn, setSideAlertOn}:CategorySideGnbOnProps) => {
    return (
        <div 
            className='side-gnb-container'
            style={{ right: sideAlertOn ? "0" : "-300px" }}
        >
            <div className='side-gnb'>
                <button className='side-gnb-close-btn'
                    onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        setSideAlertOn(false);
                    }}
                >
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    );
};

export default SideAlert;