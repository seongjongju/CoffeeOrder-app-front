'use client';
import useSignUpInputState from '@/features/signUp/hook/useSignUpInputState';
import useSignUpValidation from '@/features/signUp/hook/useSignUpValidation';
import Button from '@/shared/components/Button';
import CertificationFormField from '@/shared/components/CertificationFormField';
import FormField from '@/shared/components/FormField';
import Modal from '@/shared/components/Modal';
import useModalShow from '@/shared/hook/useModalShow';
import { Inner, NextButtonContainer, Section } from '@/shared/styled/GlobalStyled';
import axios from 'axios';

const SignUpPage = () => {
    const {signUpState, signUpInputChange, signUpInputReset} = useSignUpInputState();
    const {signUpErrorMsg, onBlur} = useSignUpValidation(signUpState);
    const {modalShow, setModalShow, modalText, setModalText} = useModalShow();

    const signUpInputChcke = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const hasError = Object.values(signUpErrorMsg).some((msg) => msg !== '');
        const hasInput = Object.values(signUpState).some((state) => state === '');
        if(hasError || hasInput) {
            setModalText('필수 입력창을 확인해주세요.')
            setModalShow(true);
        };
    };

    const idDuplicationCheck = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const id = signUpState.id.trim();
        if(!id) {
            setModalText('아이디를 입력해주세요.');
            setModalShow(true);
            return;
        };

        const idRegex = /^[a-zA-Z0-9]{5,12}$/;
        if(!idRegex.test(signUpState.id.trim())) {
            setModalText('유효하지 않은 아이디입니다.');
            setModalShow(true);
            signUpInputReset('id');
            return;
        }

        try {
            const res = await axios.get('http://localhost:4000/api/users/check-id',{
                params: {id: signUpState.id}
            });
            if(res.data.isTaken) setModalText('이미 사용중인 아이디입니다.');
            else setModalText('사용가능한 아이디입니다.');
            setModalShow(true);
            console.log(res.data);
        }catch(err: any) {
            console.error('아이디 중복확인 서버 오류', err);
        }
    };

    return (
        <Section>
            <Inner>
                <form>
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
                        placeholder='영문 + 숫자 총 8자리'
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
                    />
                    <CertificationFormField 
                        label='인증번호'
                        type='text'
                        placeholder='인증번호 입력'
                        buttonText='인증번호 확인'
                        value={signUpState.certificationNumber}
                        onChange={(e) => signUpInputChange(e, 'certificationNumber')}
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
                    modalText={modalText}
                    setModalText={setModalText}
                />
            }
        </Section>
    );
};

export default SignUpPage;