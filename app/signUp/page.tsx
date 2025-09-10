'use client';
import Button from '@/shared/components/Button';
import CertificationFormField from '@/shared/components/CertificationFormField';
import FormField from '@/shared/components/FormField';
import { Inner, NextButtonContainer } from '@/shared/styled/GlobalStyled';
import React, { useCallback, useReducer, useState } from 'react';

const initialvalue = {
    id: '',
    password: '',
    passwordCheck: '',
    name: '',
    phoneNumber: '',
    email: '',
    certificationNumber: '',
    birth: ''
} 

const reducerActionTypes = {
    userId: 'USER_ID',
    userPassword: 'USER_PASSWORD',
    userPasswordCheck: 'USER_PASSWORD_CHECK',
    userName: 'USER_NAME',
    userPhoneNumber: 'USER_PHONE_NUMBER',
    userEmail: 'USER_EMAIL',
    userCertificationNumber: 'USER_CERTIFICATION_NUMBER',
    userBirth: 'USER_BIRTH'
} 

type ReducerType = {
    state: typeof initialvalue,
    action: {type: string, payload: string}
};

const reducer = (state: ReducerType['state'], action: ReducerType['action']) => {
    switch(action.type) {
        case reducerActionTypes.userId:
            return {...state, id: action.payload};
        case reducerActionTypes.userPassword:
            return {...state, password: action.payload};
        case reducerActionTypes.userPasswordCheck:
            return {...state, passwordCheck: action.payload};
        case reducerActionTypes.userName:
            return {...state, name: action.payload};
        case reducerActionTypes.userPhoneNumber:
            return {...state, phoneNumber: action.payload};
        case reducerActionTypes.userEmail: 
            return {...state, email: action.payload};
        case reducerActionTypes.userCertificationNumber:
            return {...state, certificationNumber: action.payload};
        case reducerActionTypes.userBirth:
            return {...state, birth: action.payload};
        default:
            return state;
    }; 
};

type ErrorTypes = {
    idErrorMessage: string,
    passwordErrorMessage: string,
    passwordCheckErrorMessage: string,
    nameErrorMessage: string,
    phoneNumberErrorMessage: string,
    emailErrorMessage: string,
    certificationNumberErrorMessage: string,
    birthErrorMessage: string,
};

const SignUpPage = () => {
    const [signUpState, dispatch] = useReducer(reducer, initialvalue);
    const [signUpErrorMsg, setSignUpErrorMsg] = useState<ErrorTypes>({
        idErrorMessage: '',
        passwordErrorMessage: '',
        passwordCheckErrorMessage: '',
        nameErrorMessage: '',
        phoneNumberErrorMessage: '',
        emailErrorMessage: '',
        certificationNumberErrorMessage: '',
        birthErrorMessage: '',
    });

    const signUpInputChange = useCallback((e:React.ChangeEvent<HTMLInputElement>, type:string) => {
        dispatch({ type: type, payload: e.target.value });
    }, [signUpState]);

    const onBlur = (field:string, value: string) => {
        if(field === 'id') {
            const idRegex = /^[a-zA-Z0-9]{5,12}$/;
            if(!idRegex.test(signUpState.id.trim())) return setSignUpErrorMsg(prev => ({...prev, idErrorMessage: '유효하지 않은 아이디입니다.'}));
            else return setSignUpErrorMsg(prev => ({...prev, idErrorMessage: ''}));;
        };
        
        if(field === 'password') {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/;
            if(!passwordRegex.test(signUpState.password.trim())) return setSignUpErrorMsg(prev => ({...prev, passwordErrorMessage: '유효하지 않은 비밀번호입니다.'}));
            else return setSignUpErrorMsg(prev => ({...prev, passwordErrorMessage: ''}));
        };

        if(field === 'passwordCheck') {
            if(signUpState.password !== signUpState.passwordCheck) return setSignUpErrorMsg(prev => ({ ...prev, passwordCheckErrorMessage: '비밀번호가 일치하지 않습니다.' }));
            else return setSignUpErrorMsg(prev => ({ ...prev, passwordCheckErrorMessage: '' }));
        };

        if(field === 'name') {
            const nameRegex = /^[가-힣]{2,10}$/;
            if(!nameRegex.test(signUpState.name.trim())) return setSignUpErrorMsg(prev => ({ ...prev, nameErrorMessage: '유효하지 않은 이름입니다.' }));
            else return setSignUpErrorMsg(prev => ({ ...prev, nameErrorMessage: '' }));
        };

        if(field === 'phoneNumber') {
            const phoneNumberRegex = /^010[0-9]{8}$/;
            if(!phoneNumberRegex.test(signUpState.phoneNumber.trim())) return setSignUpErrorMsg(prev => ({ ...prev, phoneNumberErrorMessage: '유효하지 않은 전화번호입니다.' }));
            else return setSignUpErrorMsg(prev => ({ ...prev, phoneNumberErrorMessage: '' }));
        };

        if(field === 'email') {
            const emailRegex = / /
        };  
    };

    return (
        <>
            <Inner>
                <form>
                    <CertificationFormField 
                        label='아이디'
                        type='text'
                        placeholder='abc123'
                        buttonText='중복확인'
                        value={signUpState.id}
                        onChange={(e) => signUpInputChange(e, reducerActionTypes.userId)}
                        onBlur={(e) => onBlur('id', e.currentTarget.value)}
                        errMessage={signUpErrorMsg.idErrorMessage}
                    />
                    <FormField 
                        label='비밀번호'
                        type='password'
                        placeholder='영문 + 숫자 총 8자리'
                        value={signUpState.password}
                        onChange={(e) => signUpInputChange(e, reducerActionTypes.userPassword)}
                        onBlur={(e) => onBlur('password', e.currentTarget.value)}
                        errMessage={signUpErrorMsg.passwordErrorMessage}
                    />
                    <FormField 
                        label='비밀번호 확인'
                        type='password'
                        placeholder='비밀번호 확인'
                        value={signUpState.passwordCheck}
                        onChange={(e) => signUpInputChange(e, reducerActionTypes.userPasswordCheck)}
                        onBlur={(e) => onBlur('passwordCheck', e.currentTarget.value)}
                        errMessage={signUpErrorMsg.passwordCheckErrorMessage}
                    />
                    <FormField 
                        label='이름'
                        type='text'
                        placeholder='실명을 입력하세요'
                        value={signUpState.name}
                        onChange={(e) => signUpInputChange(e, reducerActionTypes.userName)}
                        onBlur={(e) => onBlur('name', e.currentTarget.value)}
                        errMessage={signUpErrorMsg.nameErrorMessage}
                    />
                    <FormField 
                        label='휴대폰 번호'
                        type='tel'
                        placeholder='‘-’구분없이 입력'
                        value={signUpState.phoneNumber}
                        onChange={(e) => signUpInputChange(e, reducerActionTypes.userPhoneNumber)}
                        onBlur={(e) => onBlur('phoneNumber', e.currentTarget.value)}
                        errMessage={signUpErrorMsg.phoneNumberErrorMessage}
                    />
                    <CertificationFormField 
                        label='이메일'
                        type='email'
                        placeholder='이메일 주소 입력'
                        buttonText='인증번호 발송'
                        value={signUpState.email}
                        onChange={(e) => signUpInputChange(e, reducerActionTypes.userEmail)}
                        onBlur={(e) => onBlur('email', e.currentTarget.value)}
                        errMessage={signUpErrorMsg.emailErrorMessage}
                    />
                    <CertificationFormField 
                        label='인증번호'
                        type='text'
                        placeholder='인증번호 입력'
                        buttonText='인증번호 확인'
                        value={signUpState.certificationNumber}
                        onChange={(e) => signUpInputChange(e, reducerActionTypes.userCertificationNumber)}
                        errMessage=''
                    />
                    <FormField 
                        label='생년월일'
                        type='text'
                        placeholder='8자리 입력'
                        value={signUpState.birth}
                        onChange={(e) => signUpInputChange(e, reducerActionTypes.userBirth)}
                        errMessage=''
                    />
                    <NextButtonContainer>
                        <Button 
                            buttonText='가입하기'
                        />
                    </NextButtonContainer>
                </form>
            </Inner>
        </>
    );
};

export default SignUpPage;