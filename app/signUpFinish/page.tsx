import Image from 'next/image';
import React from 'react';
import circleCheck from '@/shared/assets/images/icon/circle_check.svg';
import { mainColor } from '@/shared/styled/GlobalStyled';

const SignUpFinishPage = () => {
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
                    fontSize: '25px',
                    color: mainColor,
                    textAlign: 'center',
                    fontWeight: 600 
                }}
            >
                회원가입이 완료되었습니다.
            </p>
        </div>
    );
};

export default SignUpFinishPage;