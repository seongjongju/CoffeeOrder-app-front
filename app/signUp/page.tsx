'use client';
import useSignUpInputState from '@/features/signUp/hook/useSignUpInputState';
import useSignUpValidation from '@/features/signUp/hook/useSignUpValidation';
import Button from '@/shared/components/Button';
import CertificationFormField from '@/shared/components/CertificationFormField';
import FormField from '@/shared/components/FormField';
import Modal from '@/shared/components/Modal';
import useModalShow from '@/shared/hook/useModalShow';
import { Inner, NextButtonContainer } from '@/shared/styled/GlobalStyled';

const SignUpPage = () => {
    const {signUpState, signUpInputChange, reducerActionTypes} = useSignUpInputState();
    const {signUpErrorMsg, onBlur} = useSignUpValidation(signUpState);
    const {modalShow, setModalShow} = useModalShow();

    const signUpInputChcke = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const hasError = Object.values(signUpErrorMsg).some((msg) => msg !== '');
        const hasInput = Object.values(signUpState).some((state) => state === '');
        if(hasError || hasInput) return setModalShow(true);
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
                        onBlur={(e) => onBlur('birth', e.currentTarget.value)}
                        errMessage={signUpErrorMsg.birthErrorMessage}
                    />
                    <NextButtonContainer>
                        <Button 
                            buttonText='가입하기'
                            onClick={signUpInputChcke}
                        />
                    </NextButtonContainer>
                </form>
            </Inner>

            {
                modalShow && 
                <Modal 
                    modalShow={modalShow}
                    setModalShow={setModalShow}
                    modalText='필수 입력창을 확인해주세요.'
                />
            }
        </>
    );
};

export default SignUpPage;