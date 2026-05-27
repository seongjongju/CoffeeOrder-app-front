'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import mascot from '@/public/images/mascot.png';
import FormField from '@/shared/components/formField/FormField';
import Button from '@/shared/components/button/Button';
import Link from 'next/link';
import { validations } from '@/app/util/client/Validation';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hook';
import { loginSuccess } from '@/store/auth/authSlice';
import useModalShow from '@/features/hooks/modal/useModalShow';
import Modal from '@/shared/components/modal/Modal';
import { loginActionApi } from '@/features/actions/login/login.action';

const LoginForm = () => {
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
            const data = await loginActionApi.submitLogin(userId, userPwd);
            if(data.status === "success") {
                dispatch(loginSuccess({
                    _id: data.user._id,
                    id: data.user.id,
                    name: data.user.name,
                    phoneNumber: data.user.phoneNumber,
                    email: data.user.email,
                    birth: data.user.birth
                }));
                router.push('/main');
            }; 
        } catch(err: any) {
            console.error(err);
            setModalText(err.response?.data?.message);
            setModalShow(true);
            return;
        };
    };

    return (
        <>
            <div className='auth-container'>
                <div className='auth-top'>
                    <Image src={mascot} alt='마스코트' />
                    <p className='auth-text'>
                        서비스 이용을 위해 <br />
                        로그인 해주세요!!
                    </p>
                </div>
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
                    <div className='auth-links'>
                        <Link href={'/client/user_find/id_find'} >아이디 찾기 및 비밀번호 재설정</Link>
                        <span>/</span>
                        <Link href={'/client/auth/policy'} >회원가입</Link>
                    </div>
                </form> 
            </div>

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

export default LoginForm;