'use client';
import { Inner } from '@/shared/styled/GlobalStyled';
import { AuthContainer, AuthTop, AuthText, AuthLinks } from '@/features/styled/authStyled';
import React, { useState } from 'react';
import Image from 'next/image';
import mascot from '@/shared/assets/images/contents/mascot.png';
import FormField from '@/shared/components/FormField';
import Button from '@/shared/components/Button';
import Link from 'next/link';
import { validations } from '@/shared/vaildation/Validation';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/features/login/store/hooks';
import { loginSuccess } from '@/features/login/store/authSlice';
import useModalShow from '@/shared/hook/useModalShow';
import Modal from '@/shared/components/Modal';
import AppBar from '@/shared/components/AppBar';

const LoginPage = () => {
    const [userId, setUserId] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [loginErrorMsg, setLoginErrorMsg] = useState({
        idErrorMsg: '',
        passwordErrorMsg: ''
    });
    const {modalShow, setModalShow, modalText, setModalText} = useModalShow();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const loginUserId = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    };

    const loginUserPassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserPwd(e.target.value);
    };

    const loginUserIdRegex = () => {
        if(!validations.idRegex.test(userId.trim())) {
            setLoginErrorMsg(prev => ({...prev, idErrorMsg: '유효하지 않은 아이디입니다.' }));
            return false;
        } else {
            setLoginErrorMsg(prev => ({...prev, idErrorMsg: '' }));
            return true;
        }
    };

    const passwordUserIdRegex = () => {
        if(!validations.passwordRegex.test(userPwd.trim())) {
            setLoginErrorMsg(prev => ({...prev, passwordErrorMsg: '유효하지 않은 비밀번호입니다.' }));
            return false;
        } else {
            setLoginErrorMsg(prev => ({...prev, passwordErrorMsg: '' }));
            return true;
        }
    };

    const loginSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!userId.trim() || !userPwd.trim()) {
            setModalText('아이디와 비밀번호를 모두 입력해주세요.');
            setModalShow(true);
            return;
        }

        try{
            const res = await axios.post('http://localhost:4000/api/users/login', 
                {
                    id: userId,
                    password: userPwd
                },
                {withCredentials: true}
            );

            if(res.status === 200) {
                dispatch(loginSuccess({
                    _id: res.data.user._id,
                    id: res.data.user.id,
                    name: res.data.user.name,
                    phoneNumber: res.data.user.phoneNumber,
                    email: res.data.user.email,
                    birth: res.data.user.birth
                }));
                router.push('/main');
            };

            return;
        } catch(err: any) {
            if(err.response?.status === 400) {
                setModalText('아이디 또는 비밀번호가 일치하지 않습니다.');
                setModalShow(true);
                return;
            } 
            console.error('로그인 서버 오류', err);
        };
    };

    return (
        <>
            <AppBar />
            <Inner>
                <AuthContainer>
                    <AuthTop>
                        <Image src={mascot} alt='마스코트' />
                        <AuthText>
                            서비스 이용을 위해 <br />
                            로그인 해주세요!!
                        </AuthText>
                    </AuthTop>
                    <form onSubmit={loginSubmit}>
                        <FormField 
                            label='아이디'
                            type='text'
                            placeholder='아이디 입력'
                            value={userId}
                            onChange={loginUserId}
                            onBlur={loginUserIdRegex}
                            errMessage={loginErrorMsg.idErrorMsg}
                        />
                        <FormField 
                            label='비밀번호'
                            type='password'
                            placeholder='비밀번호 입력'
                            value={userPwd}
                            onChange={loginUserPassword}
                            onBlur={passwordUserIdRegex} 
                            errMessage={loginErrorMsg.passwordErrorMsg}
                        />
                        <Button 
                            buttonText='로그인'
                        />
                        <AuthLinks>
                            <Link href={'/userFind/idFind'} >아이디 찾기</Link>
                            <Link href={'/userFind/passwordFind'} >비밀번호 찾기</Link>
                            <Link href={'/policy'} >회원가입</Link>
                        </AuthLinks>
                    </form>
                </AuthContainer>
            </Inner> 

            {
                modalShow && 
                <Modal 
                    modalShow={modalShow}
                    setModalShow={setModalShow}
                    modalText={modalText}
                    setModalText={setModalText}
                />
            }  
        </>
    );
};

export default LoginPage;