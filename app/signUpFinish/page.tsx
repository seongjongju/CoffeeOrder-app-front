'use client';
import Image from 'next/image';
import React from 'react';
import circleCheck from '@/public/icons/circle_check.svg';
import { mainColor, NextButtonContainer } from '@/shared/styled/GlobalStyled';
import Button from '@/shared/components/button/Button';
import { useRouter } from 'next/navigation';

const SignUpFinishPage = () => {
    const router = useRouter();
    const moveLoginPage = () => {
        return router.push('/login');
    };

    return (
        <>
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
                        color: mainColor,
                        textAlign: 'center',
                        fontWeight: 600,
                        marginTop: '10px' 
                    }}
                >
                    회원가입이 완료되었습니다.
                </p>
            </div>
            <NextButtonContainer>
                <Button 
                    buttonText='로그인하러 가기'
                    onClick={moveLoginPage}
                />
            </NextButtonContainer>
        </>
    );
};

export default SignUpFinishPage;