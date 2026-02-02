'use client';
import '@/shared/styled/authStyle/authStyle.css';
import React, { useState } from 'react';
import { validations } from '@/shared/vaildation/Validation';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '../../store/hook';
import { loginSuccess } from '@/store/login/authSlice';
import useModalShow from '@/features/hooks/modal/useModalShow';
import LoginForm from './_components/LoginForm';

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
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, 
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
            if (err.response && err.response.data) {
                setModalText(err.response.data.message); 
            } 
            else {
                setModalText('서버와 통신 중 오류가 발생했습니다.');
                console.error('로그인 서버 오류', err);
            }

            setModalShow(true);
            return;
        };
    };

    return (
        <main className='main auth-main'>
            <div className='inner'>
                <LoginForm />
            </div> 
        </main>
    );
};

export default LoginPage;