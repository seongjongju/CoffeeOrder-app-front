'use client';
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

const useSignUpValidation = (signUpState:SignUpStateProps) => {
    type ErrorTypes = {
        passwordErrorMessage: string,
        passwordCheckErrorMessage: string,
        nameErrorMessage: string,
        phoneNumberErrorMessage: string,
        emailErrorMessage: string,
        certificationNumberErrorMessage: string,
        birthErrorMessage: string,
    };

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
            const emailRegex = /^(?!.*\.\.)(?!\.)(?!.*\.$)[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;
            if(!emailRegex.test(signUpState.email.trim())) return setSignUpErrorMsg(prev => ({ ...prev, emailErrorMessage: '유효하지 않은 이메일입니다.' }));
            else return setSignUpErrorMsg(prev => ({ ...prev, emailErrorMessage: '' }));
        };  

        if(field === 'birth') {
            const birthRegex = /^\d{8}$/;
            if(!birthRegex.test(signUpState.birth.trim())) return setSignUpErrorMsg(prev => ({ ...prev, birthErrorMessage: '유효하지 않은 생년월일입니다.' }));
            else return setSignUpErrorMsg(prev => ({ ...prev, birthErrorMessage: '' }));
        }
    };

    return {signUpErrorMsg, onBlur};
};

export default useSignUpValidation;