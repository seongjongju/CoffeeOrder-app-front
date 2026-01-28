'use client';
import useSignUpInputState from '@/features/signUp/hook/useSignUpInputState';
import useSignUpValidation from '@/features/signUp/hook/useSignUpValidation';
import Button from '@/shared/components/button/Button';
import CertificationFormField from '@/shared/components/formField/CertificationFormField';
import FormField from '@/shared/components/formField/FormField';
import useModalShow from '@/features/modal/hook/useModalShow';
import Modal from '@/shared/components/modal/Modal';
import { validations } from '@/shared/vaildation/Validation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { signUpApi } from '@/features/services/signUp.services';
import { signUpActionApi } from '@/features/actions/signUp.action';

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
            const data = await signUpApi.checkingId(signUpState.id);
            
            if(data.isTaken) setModalText('이미 사용중인 아이디입니다.');
            else setModalText('사용 가능한 아이디입니다.');
            setModalShow(true);
            setIsIdChecked(true);
            return;
        }catch(err: any) {
            console.error('아이디 중복확인 서버 오류', err);
            setModalText('아이디 중복확인 서버 오류');
            setModalShow(true);
            return;
        }
    };

    //이메일 중복검사
    const emailDuplicationCheck = async () => {
        try {
            const data = await signUpApi.checkingEmail(signUpState.email);

            if(data.isTaken) {
                setModalText('이미 가입된 이메일입니다.');
                setModalShow(true);
                return false;
            } 

            return true;
        } catch(err) {
            console.error('이메일 중복확인 서버 오류', err);
            setModalText('이메일 중복확인 서버 오류');
            setModalShow(true);
            return;
        };
    };

    //이메일 인증
    const emailCertificationForwarding = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(!validations.emailRegex.test(signUpState.email.trim())) {
            setModalText('이메일을 확인해 주세요.');
            setModalShow(true);
            return false;
        };     

        try {
            const isAvailable = await emailDuplicationCheck();
            if(!isAvailable) return false;

            setIsLoading(true);
            setModalText('인증번호 발송 중… 소요시간 최대 1분');
            setModalShow(true);

            await signUpApi.certificationEmail(signUpState.email);

            return;
        }catch(err: any) {
            console.error('인증번호 발송 서버 오류', err);
            setModalText('서버 오류로 인증번호 전송 실패');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const emailCertificationNumberPost = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(!validations.sixDigitRegex.test(signUpState.certificationNumber.trim())) {
            setModalText('인증번호를 확인해주세요.');
            setModalShow(true);
            signUpInputReset('certificationNumber');
            return;
        }

        try{
            const data = await signUpApi.checkingCertificationNumber(
                signUpState.email, 
                signUpState.certificationNumber
            );

            setModalText(data.message);
            setModalShow(true);

            setIsCertificationChecked(true);

            return;
        } catch(err:any) {
            console.error('인증번호 확인 서버 오류', err);
            setModalText('인증번호 확인 서버 오류');
            setModalShow(true);
            return;
        }
    };

    //회원가입 submit
    const signUpSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const hasError = Object.values(signUpErrorMsg).some((msg) => msg !== '');
        const hasInput = Object.values(signUpState).some((state) => state === '');
        if(hasError || hasInput) {
            setModalText('필수 입력창을 확인해주세요.')
            setModalShow(true);
            return false;
        };

        if (!isIdChecked || !isCertificationChecked) {
            setModalText('아이디 중복확인 및 인증번호 확인을 진행해주세요.');
            setModalShow(true);
            return false;
        }

        try {
            await signUpActionApi.submitSignUp(
                signUpState.id,
                signUpState.password,
                signUpState.name,
                signUpState.phoneNumber,
                signUpState.email,
                signUpState.certificationNumber,
                signUpState.birth
            );

            router.push('/signUpFinish');
        } catch(err: any) {
            console.error('회원가입 서버오류', err);
            setModalText('회원가입 서버오류');
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
                    value={signUpState.phoneNumber}
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
                    onClick={emailCertificationForwarding}
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