'use client';

import React, { useReducer } from 'react';
import formStyles from '@/shared/components/Form/Input/Input.module.css';
import InputWrap from '@/shared/components/Form/Input/InputWrap';
import Button from '@/shared/components/Form/Button/Button';
import axios from 'axios';

const initialState = {
    name: '',
    phoneNumber: '',
    email: '',
    emailCertification: '',
    id: '',
    password: '',
    passwordCheck: '',
};

type ReducerType = {
    state: typeof initialState,
    action: { type: string, payload: string }
}

const reducer = (state: ReducerType['state'], action: ReducerType['action']) => {
    switch (action.type) {
        case 'SET_NAME': 
            return {...state, name: action.payload };
        case 'SET_PHONE_NUMBER': 
            return {...state, phoneNumber: action.payload };
        case 'SET_EMAIL': 
            return {...state, email: action.payload };
        case 'SET_EMAIL_CERTIFICATION': 
            return {...state, emailCertification: action.payload };
        case 'SET_ID': 
            return {...state, id: action.payload };
        case 'SET_PASSWORD': 
            return {...state, password: action.payload };
        case 'SET_PASSWORD_CHECK': 
            return {...state, passwordCheck: action.payload };
        default:
            return state;
    };
};

const SignUpForm = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleRegister = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                'http://localhost:4000/api/auth/register',
                {   
                    name: state.name,
                    phoneNumber: state.phoneNumber,
                    email: state.email,
                    id: state.id,
                    password: state.password,
                }
            );
            console.log(res.data);
        }catch(err: any) {
            console.error('회원가입 서버 오류', err);
        };
    };

    return (   
        <form 
            className={formStyles.common_form}
            onSubmit={handleRegister}
        >
            <InputWrap 
                label={'이름'}
                placeholder={'이름을 입력해주세요.'}
                value={state.name}
                onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
            />

            <InputWrap 
                label={'휴대폰 번호'}
                placeholder={'-포함 입력'}
                value={state.phoneNumber}
                onChange={(e) => dispatch({ type: 'SET_PHONE_NUMBER', payload: e.target.value })}
            />

            <InputWrap 
                label={'이메일'}
                placeholder={'abc@abc'}
                value={state.email}
                onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
            />

            <InputWrap 
                label={'인증 번호 입력'}
                placeholder={'인증번호를 입력하세요.'}
                value={state.emailCertification}
                onChange={(e) => dispatch({ type: 'SET_EMAIL_CERTIFICATION', payload: e.target.value })}
            />

            <InputWrap 
                label={'아이디'}
                placeholder={'아이디를 입력해주세요.'}
                value={state.id}
                onChange={(e) => dispatch({ type: 'SET_ID', payload: e.target.value })}
            />
            <InputWrap 
                label={'비밀번호'}
                placeholder={'비밀번호를 입력해주세요.'}
                value={state.password}
                onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
            />

            <InputWrap 
                label={'비밀번호 확인'}
                placeholder={'비밀번호 확인'}
                value={state.passwordCheck}
                onChange={(e) => dispatch({ type: 'SET_PASSWORD_CHECK', payload: e.target.value })}
            />

            <Button 
                buttonText={'회원가입'}
            />
        </form> 
    );
};

export default SignUpForm;