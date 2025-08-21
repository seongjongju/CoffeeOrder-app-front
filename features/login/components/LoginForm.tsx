'use client';

import React from 'react';
import styles from '@/shared/components/Form/Input/Input.module.css';
import InputWrap from '@/shared/components/Form/Input/InputWrap';
import Button from '@/shared/components/Form/Button/Button';
import Link from 'next/link';

const LoginForm = () => {
    return (
        <section>
            <div className='inner'> 
                <h2 className='title' style={{ textAlign : 'center' }}>로그인</h2>
                <form className={styles.common_form}>
                    <InputWrap 
                        label={'아이디'}
                        placeholder={'아이디를 입력해주세요.'}
                    />
                    <InputWrap 
                        label={'패스워드'}
                        placeholder={'패스워드를 입력해주세요.'}
                    />
                    <Button 
                        buttonText={'로그인'}
                    />
                    <Link href={'/signUp'} 
                        style={
                            { 
                                display : 'block',
                                color : '#2b2b2b',
                                width : 'fit-content',
                                margin : '10px auto 0'
                            }
                        }
                    >
                        회원가입 하러가기
                    </Link>
                </form> {/* login_form */}
            </div> {/* inner */}
        </section>
    );
};

export default LoginForm;