'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import mascot from '@/public/images/mascot.png';
import FindInput from '../../_components/FindInput';
import Button from '@/shared/client/components/button/Button';
import useModalShow from '@/features/hooks/modal/useModalShow';
import Modal from '@/shared/client/components/modal/Modal';
import { validations } from '@/app/util/client/Validation';
import { useRouter } from 'next/navigation';
import { resetPasswordApi } from '@/features/clientApi/authApi';
import { useAppSelector } from '@/store/hook';
import { formatPhoneNumber } from '@/app/util/format';
import useLoading from '@/features/hooks/loading/useLoading';
import SpinerButton from '@/shared/client/components/button/SpinerButton';

const PasswordFindForm = () => {
    const {isLoading, setIsLoading} = useLoading();
    const user = useAppSelector(state => state.auth.user);
    const {modalShow, setModalShow, modalText, setModalText} = useModalShow();
    const [userId, setUserId] = useState<string>('');
    const [userPhoneNumber, setUserPhoneNumber] = useState<string>('');
    const [newPwd, setNewPwd] = useState<string>('');
    const [newPwdCheck, setNewPwdCheck] = useState<string>('');

    //아이디 입력
    const handleChangeUserId = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    };

    //휴대폰 번호 입력
    const handleChangeUserPhoneNumber = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 11));
    };

    //새 비밀번호 작성
    const handleChangeNewPwd = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewPwd(e.target.value);
    };

    //새 비밀번호 확인
    const handleChangeNewPwdCheck = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewPwdCheck(e.target.value);
    };

    //유저 정보 인증 submit
    const handleCertificationSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setModalShow(true);

        //아무것도 안적었을 시
        if(userId.trim() === '' || userPhoneNumber.trim() === '' || newPwd.trim() === '') {
            setModalText('아이디, 휴대폰 번호, 새 비밀번호를 입력해주세요.');
            return;
        }

        //아이디 형식 오류
        if(!validations.idRegex.test(userId.trim())) {
            setModalText('아이디 형식이 올바르지 않습니다.');
            return;
        }

        //휴대폰 번호 형식 오류
        if(!validations.phoneNumberRegex.test(userPhoneNumber.trim())) {
            setModalText('휴대폰 번호 형식이 올바르지 않습니다.');
            return;
        }

        //비밀번호 형식 오류
        if(!validations.passwordRegex.test(newPwd.trim())) {
            setModalText('비밀번호 형식이 올바르지 않습니다.');
            return;
        };

        //아이디가 로컬에 저장된 아이디와 일치 하지 않을 때
        if(user?.userId !== userId) {
            setModalText('아이디를 확인해주세요.');
            return;
        }

        //휴대폰 번호가 로컬에 저장된 휴대폰 번호와 일치 하지 않을 때
        if(user?.phoneNumber !== userPhoneNumber) {
            setModalText('휴대폰 번호를 확인해주세요.');
            return;
        }

        //새 비밀번호가 일치 하지 않을 때
        if(newPwd !== newPwdCheck) {
            setModalText('새 비밀번호가 일치하지 않습니다.');
            return;
        }

        setModalShow(false);

        //유저 인증정보를 서버로 전송
        try {
            setIsLoading(true);

            const data = await resetPasswordApi(
                userId, 
                userPhoneNumber,
                newPwd
            );  

            if(!data.success) {
                setModalText(`${data.message}`);
                setModalShow(true);
                return;
            }

            setModalText(`${data.message}`);
            setModalShow(true);
            return; 
        } catch(err: any) {
            console.error(err.response?.data?.message);
            setModalShow(true);
            setModalText(err.response?.data?.message);
            return;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className='auth-container'>
                <div className='auth-top'>
                    <Image src={mascot} alt='마스코트' />
                    <p className='auth-text'>
                        비밀번호 재설정을 위해 <br />
                        아이디를 입력해 주세요!!
                    </p>
                </div>
                <form onSubmit={handleCertificationSubmit}>
                    <FindInput 
                        placeholder='아이디 입력'
                        type='text'
                        autoComplete='off'
                        label='아이디'
                        value={userId}
                        onChange={handleChangeUserId}
                    />
                    <FindInput 
                        placeholder="'-'구분없이 입력"
                        type='tel'
                        autoComplete='tel'
                        label="휴대폰 번호"
                        value={formatPhoneNumber(userPhoneNumber)}
                        onChange={handleChangeUserPhoneNumber}
                    />
                    <FindInput 
                        label='새 비밀번호'
                        type='password'
                        autoComplete='new-password'
                        placeholder='새 비밀번호 입력'
                        value={newPwd}
                        onChange={handleChangeNewPwd}
                    />
                    <FindInput 
                        label='새 비밀번호 확인'
                        type='password'
                        autoComplete='new-password'
                        placeholder='새 비밀번호 재입력'
                        value={newPwdCheck}
                        onChange={handleChangeNewPwdCheck}
                    />
                    <SpinerButton 
                        isLoading={isLoading}
                        buttonText='비밀번호 재설정'
                    />
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

export default PasswordFindForm;