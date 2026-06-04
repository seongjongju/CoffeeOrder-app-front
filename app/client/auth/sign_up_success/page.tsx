'use client';
import Image from 'next/image';
import React from 'react';
import '../_styled/authStyle.css';
import circleCheck from '@/public/icons/circle_check.svg';
import Button from '@/shared/client/components/button/Button';
import { useRouter } from 'next/navigation';

const SignUpSuccessPage = () => {
    const router = useRouter();
    const moveLoginPage = () => {
        return router.push('/client/auth/login');
    };

    return (
        <main className='main'>
            <div
                style={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%'
                }}
            >
                <Image src={circleCheck} alt='체크표시' />
                <p
                    style={{ 
                        fontSize: '22px',
                        color: "#2B1B16",
                        textAlign: 'center',
                        fontWeight: 600,
                        marginTop: '10px' 
                    }}
                >
                    회원가입이 완료되었습니다.
                </p>
            </div>
            <div className='next-button-container'>
                <Button 
                    buttonText='로그인하러 가기'
                    onClick={moveLoginPage}
                />
            </div>
        </main>
    );
};

export default SignUpSuccessPage;