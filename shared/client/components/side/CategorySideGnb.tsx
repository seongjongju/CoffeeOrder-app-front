import React from 'react';
import '@/shared/client/styled/sideGnb/sideGnb.css';
import Link from 'next/link';

interface CategorySideGnbOnProps {
    categorySideOn: boolean;
    setCategorySideOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategorySideGnb = ({categorySideOn, setCategorySideOn}:CategorySideGnbOnProps) => {
    return (
        <div 
            className='side-gnb-container'
            style={{ right: categorySideOn ? "0" : "-300px" }}
        >
            <div className='side-gnb'>
                <button className='side-gnb-close-btn'
                    onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        setCategorySideOn(false);
                    }}
                >
                    <span></span>
                    <span></span>
                </button>

                <Link 
                    className='side-gnb-link' href={'/main'}
                    onClick={() => {setCategorySideOn(false);}}
                >
                    HOME
                </Link>
                <Link 
                    className='side-gnb-link' href={'/mypage'} 
                    onClick={() => {setCategorySideOn(false);}}
                >
                    MY PAGE
                </Link>
                <Link 
                    className='side-gnb-link' href={'/order/orderHistory'}
                    onClick={() => {setCategorySideOn(false);}}
                >
                    ORDER HISTORY
                </Link>
            </div>
        </div>
    );
};

export default CategorySideGnb;