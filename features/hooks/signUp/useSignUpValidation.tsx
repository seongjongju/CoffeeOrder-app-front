'use client';
import { validations } from '@/app/util/client/Validation';
import React, { useState } from 'react';

interface SignUpStateProps {
    id: string;
    password: string;
    passwordCheck: string;
    name: string;
    phoneNumber: string;
    email: string;
    certificationNumber: string;
    birth: string;
};

type ErrorTypes = {
    passwordErrorMessage: string,
    passwordCheckErrorMessage: string,
    nameErrorMessage: string,
    phoneNumberErrorMessage: string,
    emailErrorMessage: string,
    certificationNumberErrorMessage: string,
    birthErrorMessage: string,
};

const useSignUpValidation = (signUpState:SignUpStateProps) => {
    const [signUpErrorMsg, setSignUpErrorMsg] = useState<ErrorTypes>({
        passwordErrorMessage: '',
        passwordCheckErrorMessage: '',
        nameErrorMessage: '',
        phoneNumberErrorMessage: '',
        emailErrorMessage: '',
        certificationNumberErrorMessage: '',
        birthErrorMessage: '',
    });

    const onBlur = (field:string, value: string) => {        
        if(field === 'password') {
            if(!validations.passwordRegex.test(signUpState.password.trim())) return setSignUpErrorMsg(prev => ({...prev, passwordErrorMessage: '유효하지 않은 비밀번호입니다.'}));
            else return setSignUpErrorMsg(prev => ({...prev, passwordErrorMessage: ''}));
        };

        if(field === 'passwordCheck') {
            if(signUpState.password !== signUpState.passwordCheck) return setSignUpErrorMsg(prev => ({ ...prev, passwordCheckErrorMessage: '비밀번호가 일치하지 않습니다.' }));
            else return setSignUpErrorMsg(prev => ({ ...prev, passwordCheckErrorMessage: '' }));
        };

        if(field === 'name') {
            if(!validations.nameRegex.test(signUpState.name.trim())) return setSignUpErrorMsg(prev => ({ ...prev, nameErrorMessage: '유효하지 않은 이름입니다.' }));
            else return setSignUpErrorMsg(prev => ({ ...prev, nameErrorMessage: '' }));
        };

        if(field === 'phoneNumber') {
            if(!validations.phoneNumberRegex.test(signUpState.phoneNumber.trim())) return setSignUpErrorMsg(prev => ({ ...prev, phoneNumberErrorMessage: '유효하지 않은 전화번호입니다.' }));
            else return setSignUpErrorMsg(prev => ({ ...prev, phoneNumberErrorMessage: '' }));
        };

        if(field === 'birth') {
            if(!validations.birthRegex.test(signUpState.birth.trim())) return setSignUpErrorMsg(prev => ({ ...prev, birthErrorMessage: '유효하지 않은 생년월일입니다.' }));
            else return setSignUpErrorMsg(prev => ({ ...prev, birthErrorMessage: '' }));
        }
    };

    return {signUpErrorMsg, onBlur};
};

export default useSignUpValidation;