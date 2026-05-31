'use client';
import useSignUpInputState from '@/features/hooks/signUp/useSignUpInputState';
import useSignUpValidation from '@/features/hooks/signUp/useSignUpValidation';
import Button from '@/shared/components/button/Button';
import CertificationFormField from '@/shared/components/formField/CertificationFormField';
import FormField from '@/shared/components/formField/FormField';
import useModalShow from '@/features/hooks/modal/useModalShow';
import Modal from '@/shared/components/modal/Modal';
import { validations } from '@/app/util/client/Validation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { authCodeReduplicationApi, idReduplicationApi, memberResisterApi, sendEmailApi } from '@/features/clientApi/authApi';
import { formatPhoneNumber } from '@/app/util/client/format';

const SignUpForm = () => {
    const {signUpState, signUpInputChange, signUpInputReset} = useSignUpInputState();
    const {signUpErrorMsg, onBlur} = useSignUpValidation(signUpState);
    const {modalShow, setModalShow, modalText, setModalText} = useModalShow();
    const [isIdChecked, setIsIdChecked] = useState(false);
    const [isCertificationChecked, setIsCertificationChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    //아이디 중복검사
    const idDuplicationCheck = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const id = signUpState.id.trim();

        if(!id) {
            setModalText('아이디를 입력해주세요.');
            setModalShow(true);
            return;
        };

        if(!validations.idRegex.test(signUpState.id.trim())) {
            setModalText('유효하지 않은 아이디입니다.');
            setModalShow(true);
            signUpInputReset('id');
            return;
        }

        try {
            const data = await idReduplicationApi(id);
            setModalText(data.message);
            setModalShow(true);
            return;
        }catch(err: any) {
            console.error(err.message);
            setModalText(err.response.data.message);
            setModalShow(true);
            return;
        }
    };

    //이메일 중복검사 및 인증번호 발송
    const sendEmail = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const data = await sendEmailApi(signUpState.email);

            setModalText(data.message);
            setModalShow(true);
            return;
        } catch(err: any) {
            console.error(err.massage);
            setModalText(err.response.data.message);
            setModalShow(true);
            return;
        };
    };

    //인증번호확인
    const emailCertificationNumberPost = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(!validations.sixDigitRegex.test(signUpState.certificationNumber.trim())) {
            setModalText('인증번호를 확인해주세요.');
            setModalShow(true);
            signUpInputReset('certificationNumber');
            return;
        }

        try{
            const data = await authCodeReduplicationApi(
                signUpState.email, 
                signUpState.certificationNumber
            );

            setModalText(data.message);
            setModalShow(true);
            setIsCertificationChecked(true);
            return;
        } catch(err:any) {
            console.error(err.message);
            setModalText(err.response?.data?.message);
            setModalShow(true);
            return;
        }
    };

    //회원가입 submit
    const signUpSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const data = await memberResisterApi(
                signUpState.id,
                signUpState.password,
                signUpState.name,
                signUpState.phoneNumber,
                signUpState.email,
                signUpState.birth
            );

            if(!data.success) {
                setModalText(data.message);
                setModalShow(true);
            }

            router.push('/client/auth/sign_up_success')
            return;
        } catch(err: any) {
            console.error(err);
            setModalText(err.response?.data?.message);
            setModalShow(true);
            return;
        };
    };

    return (
        <>
            <form onSubmit={signUpSubmit}>
                <CertificationFormField
                    label='아이디'
                    type='text'
                    placeholder='abc123'
                    buttonText='중복확인'
                    value={signUpState.id}
                    onChange={(e) => signUpInputChange(e, 'id')}
                    onClick={idDuplicationCheck}
                />
                <FormField 
                    label='비밀번호'
                    type='password'
                    placeholder='영문 + 숫자 + 기호 총 8자리'
                    value={signUpState.password}
                    onChange={(e) => signUpInputChange(e, 'password')}
                    onBlur={(e) => onBlur('password', e.currentTarget.value)}
                    errMessage={signUpErrorMsg.passwordErrorMessage}
                />
                <FormField 
                    label='비밀번호 확인'
                    type='password'
                    placeholder='비밀번호 확인'
                    value={signUpState.passwordCheck}
                    onChange={(e) => signUpInputChange(e, 'passwordCheck')}
                    onBlur={(e) => onBlur('passwordCheck', e.currentTarget.value)}
                    errMessage={signUpErrorMsg.passwordCheckErrorMessage}
                />
                <FormField 
                    label='이름'
                    type='text'
                    placeholder='실명을 입력하세요'
                    value={signUpState.name}
                    onChange={(e) => signUpInputChange(e, 'name')}
                    onBlur={(e) => onBlur('name', e.currentTarget.value)}
                    errMessage={signUpErrorMsg.nameErrorMessage}
                />
                <FormField 
                    label='휴대폰 번호'
                    type='tel'
                    placeholder='‘-’구분없이 입력'
                    value={formatPhoneNumber(signUpState.phoneNumber)}
                    onChange={(e) => signUpInputChange(e, 'phoneNumber')}
                    onBlur={(e) => onBlur('phoneNumber', e.currentTarget.value)}
                    errMessage={signUpErrorMsg.phoneNumberErrorMessage}
                />
                <CertificationFormField 
                    label='이메일'
                    type='email'
                    placeholder='이메일 주소 입력'
                    buttonText='인증번호 발송'
                    value={signUpState.email}
                    onChange={(e) => signUpInputChange(e, 'email')}
                    onClick={sendEmail}
                />
                <CertificationFormField 
                    label='인증번호'
                    type='text'
                    placeholder='인증번호 입력 숫자 6자리'
                    buttonText='인증번호 확인'
                    value={signUpState.certificationNumber}
                    onChange={(e) => signUpInputChange(e, 'certificationNumber')}
                    onClick={emailCertificationNumberPost}
                />
                <FormField 
                    label='생년월일'
                    type='text'
                    placeholder='8자리 입력'
                    value={signUpState.birth}
                    onChange={(e) => signUpInputChange(e, 'birth')}
                    onBlur={(e) => onBlur('birth', e.currentTarget.value)}
                    errMessage={signUpErrorMsg.birthErrorMessage}
                />
                <div className='next-button-container'>
                    <Button 
                        buttonText='가입하기'
                    />
                </div>
            </form> 

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

export default SignUpForm;