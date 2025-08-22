'use client';

import React from 'react';
import formStyles from '@/shared/components/Form/Input/Input.module.css';
import loginStyles from '../login.module.css';
import InputWrap from '@/shared/components/Form/Input/InputWrap';
import Button from '@/shared/components/Form/Button/Button';
import Link from 'next/link';

const LoginForm = () => {
    return (
        <form className={formStyles.common_form}>
            <InputWrap 
                label={'아이디'}
                placeholder={'아이디를 입력해주세요.'}
            />
            <InputWrap 
                label={'비밀번호'}
                placeholder={'비밀번호를 입력해주세요.'}
            />
            <Button 
                buttonText={'로그인'}
            />
            <div className={loginStyles.login_Links}>
                <Link href={'/'}>아이디 찾기</Link>
                <Link href={'/'}>비밀번호 찾기</Link>
                <Link href={'/signUpPolicy'}>회원가입</Link>
            </div>
        </form>
    );
};

export default LoginForm;