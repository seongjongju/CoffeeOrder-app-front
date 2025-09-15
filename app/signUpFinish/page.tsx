'use client';
import Image from 'next/image';
import React from 'react';
import circleCheck from '@/shared/assets/images/icon/circle_check.svg';
import { mainColor } from '@/shared/styled/GlobalStyled';
import { useSearchParams } from 'next/navigation';

const SignUpFinishPage = () => {
    const sp = useSearchParams();
    const name = sp.get('name');

    return (
        <div
            style={{ 
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Image src={circleCheck} alt='체크표시' />
            <p
                style={{ 
                    fontSize: '18px',
                    color: mainColor,
                    textAlign: 'center' 
                }}
            >
                가입완료!!<br />
                <strong style={{ fontSize: '25px' }}>{name ? name : null}환영해요</strong>
            </p>
        </div>
    );
};

export default SignUpFinishPage;