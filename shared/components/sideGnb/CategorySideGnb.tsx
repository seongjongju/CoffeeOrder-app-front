import React from 'react';
import { SideGnbContainer, SideGnb, SideGnbLink, SideGnbCloseBtn } from '@/shared/styled/GlobalStyled';
import Link from 'next/link';

interface CategorySideGnbOnProps {
    categorySideOn: boolean;
    setCategorySideOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategorySideGnb = ({categorySideOn, setCategorySideOn}:CategorySideGnbOnProps) => {
    return (
        <SideGnbContainer style={{ right: categorySideOn ? "0" : "-300px" }}>
            <SideGnb>
                <SideGnbCloseBtn
                    onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        setCategorySideOn(false);
                    }}
                >
                    <span></span>
                    <span></span>
                </SideGnbCloseBtn>

                <SideGnbLink href={'/main'}>
                    HOME
                </SideGnbLink>
                <SideGnbLink href={'/mypage'}>
                    MY PAGE
                </SideGnbLink>
                <SideGnbLink href={'/'}>
                    ORDER HISTORY
                </SideGnbLink>
                <SideGnbLink href={'/'}>
                    EVENT
                </SideGnbLink>
            </SideGnb>
        </SideGnbContainer>
    );
};

export default CategorySideGnb;