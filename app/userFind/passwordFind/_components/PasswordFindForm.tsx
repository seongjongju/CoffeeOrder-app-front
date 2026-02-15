'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import mascot from '@/public/images/mascot.png';
import FindInput from '@/app/userFind/_components/FindInput';
import Button from '@/shared/components/button/Button';
import useModalShow from '@/features/hooks/modal/useModalShow';
import Modal from '@/shared/components/modal/Modal';
import { validations } from '@/shared/vaildation/Validation';
import { useRouter } from 'next/navigation';
import { userFindApi } from '@/features/services/userFind/userFind.services';
import { userFindActionApi } from '@/features/actions/userFind/userFind.action';

const PasswordFindForm = () => {
    const {modalShow, setModalShow, modalText, setModalText} = useModalShow();
    const [userId, setUserId] = useState<string>('');
    const [userPhoneNumber, setUserPhoneNumber] = useState<string>('');
    const [newPwd, setNewPwd] = useState<string>('');
    const [newPwdCheck, setNewPwdCheck] = useState<string>('');
    const router = useRouter();

    //아이디 입력
    const handleChangeUserId = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    };

    //휴대폰 번호 입력
    const handleChangeUserPhoneNumber = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserPhoneNumber(e.target.value);
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

        //아무것도 안적었을 시
        if(userId.trim() === '' || userPhoneNumber.trim() === '' || newPwd.trim() === '') {
            setModalText('아이디, 휴대폰 번호, 새 비밀번호를 입력해주세요.');
            setModalShow(true);
            return false;
        }

        //아이디 형식 오류
        if(!validations.idRegex.test(userId.trim())) {
            setModalText('아이디 형식이 올바르지 않습니다.');
            setModalShow(true);
            return false;
        }

        //휴대폰 번호 형식 오류
        if(!validations.phoneNumberRegex.test(userPhoneNumber.trim())) {
            setModalText('휴대폰 번호 형식이 올바르지 않습니다.');
            setModalShow(true);
            return false;
        }

        //비밀번호 형식 오류
        if(!validations.passwordRegex.test(newPwd.trim())) {
            setModalText('비밀번호 형식이 올바르지 않습니다.');
            setModalShow(true);
            return false;
        };

        //새 비밀번호가 일치 하지 않을 때
        if(newPwd !== newPwdCheck) {
            setModalText('새 비밀번호가 일치하지 않습니다.');
            setModalShow(true);
            return false;
        }

        //유저 인증정보를 서버로 전송
        try {
            const data = await userFindApi.certificationUser(userId, userPhoneNumber);

            //유저정보가 일치하면 비밀번호 변경
            if(data.status === "success") {
                try{
                    await userFindActionApi.changedPassword(userId, newPwd);

                    setModalText(data.message);
                    setModalShow(true);
                } catch(err: any) {
                    console.error(err);
                    setModalText(err.response?.data?.message);
                    setModalShow(true);
                    return;
                }
            }
        } catch(err: any) {
            console.error(err);
            setModalText(err.response?.data?.message);
            setModalShow(true);
            return;
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
                        label='아이디'
                        value={userId}
                        onChange={handleChangeUserId}
                    />
                    <FindInput 
                        placeholder="'-'구분없이 입력"
                        type='tel'
                        label="휴대폰 번호"
                        value={userPhoneNumber}
                        onChange={handleChangeUserPhoneNumber}
                    />
                    <FindInput 
                        label='새 비밀번호'
                        type='password'
                        placeholder='새 비밀번호 입력'
                        value={newPwd}
                        onChange={handleChangeNewPwd}
                    />
                    <FindInput 
                        label='새 비밀번호 확인'
                        type='password'
                        placeholder='새 비밀번호 재입력'
                        value={newPwdCheck}
                        onChange={handleChangeNewPwdCheck}
                    />
                    <Button 
                        buttonText='확인'
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