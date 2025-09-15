'use client';
import { Inner } from '@/shared/styled/GlobalStyled';
import { AuthContainer, AuthTop, AuthText, AuthLinks } from '@/features/styled/authStyled';
import React, { useState } from 'react';
import Image from 'next/image';
import mascot from '@/shared/assets/images/contents/mascot.png';
import FormField from '@/shared/components/FormField';
import Button from '@/shared/components/Button';
import Link from 'next/link';

const LoginPage = () => {
    const [userId, setUserId] = useState('');
    const [userPwd, setUserPwd] = useState('');

    return (
        <>
            <Inner>
                <AuthContainer>
                    <AuthTop>
                        <Image  src={mascot} alt='마스코트' />
                        <AuthText>
                            서비스 이용을 위해 <br />
                            로그인 해주세요!!
                        </AuthText>
                    </AuthTop>
                    <form>
                        <FormField 
                            label='아이디'
                            type='text'
                            placeholder='아이디 입력'
                            // value={''}
                            // onChange={''}
                            // onBlur={(e) => onBlur('birth', e.currentTarget.value)}
                            // errMessage={signUpErrorMsg.birthErrorMessage}
                        />
                        <FormField 
                            label='비밀번호'
                            type='password'
                            placeholder='비밀번호 입력'
                            // value={''}
                            // onChange={''}
                            // onBlur={(e) => onBlur('birth', e.currentTarget.value)}
                            // errMessage={signUpErrorMsg.birthErrorMessage}
                        />
                        <Button 
                            buttonText='로그인'
                        />
                        <AuthLinks>
                            <Link href={'/'} >아이디 찾기</Link>
                            <Link href={'/'} >비밀번호 찾기</Link>
                            <Link href={'/policy'} >회원가입</Link>
                        </AuthLinks>
                    </form>
                </AuthContainer>
            </Inner>   
        </>
    );
};

export default LoginPage;