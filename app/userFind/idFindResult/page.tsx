'use client';
import '@/shared/styled/authStyle/authStyle.css';
import Image from 'next/image';
import mascot from '@/public/images/mascot.png';
import { Suspense } from 'react';
import FindIdResult from '@/app/userFind/idFindResult/_components/FindIdResult';

const IdFindResultPage = () => {
    return (
        <main className='main auth-main'>
            <div className='inner'>
                <div>
                    <div className='auth-top'>
                        <Image src={mascot} alt='마스코트' />
                        <p className='auth-text'>
                            회원님의 정보와 일치하는 <br />
                            아이디를 찾았어요!!
                        </p>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <FindIdResult />
                    </Suspense>
                </div>
            </div> 
        </main>
    );
};

export default IdFindResultPage;