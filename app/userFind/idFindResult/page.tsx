'use client';
import { AuthText, AuthTop } from '@/features/styled/authStyled';
import { Inner } from '@/shared/styled/GlobalStyled';
import Image from 'next/image';
import mascot from '@/public/images/mascot.png';
import { Suspense } from 'react';
import FindIdResult from '@/features/userFind/components/FindIdResult';
import AppBar from '@/shared/components/appbar/AppBar';

const IdFindResultPage = () => {
    return (
        <>
            <AppBar />
            <Inner>
                <div>
                    <AuthTop>
                        <Image src={mascot} alt='마스코트' />
                        <AuthText>
                            회원님의 정보와 일치하는 <br />
                            아이디를 찾았어요!!
                        </AuthText>
                    </AuthTop>
                    <Suspense fallback={<div>Loading...</div>}>
                        <FindIdResult />
                    </Suspense>
                </div>
            </Inner> 
        </>
    );
};

export default IdFindResultPage;