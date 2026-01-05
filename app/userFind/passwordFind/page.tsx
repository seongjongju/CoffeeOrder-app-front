'use client';
import '@/shared/styled/authStyle/authStyle.css';
import Image from 'next/image';
import mascot from '@/public/images/mascot.png';
import React, { useState } from 'react';
import FindInput from '@/features/userFind/components/FindInput';
import Button from '@/shared/components/button/Button';
import useModalShow from '@/shared/components/modal/hook/useModalShow';
import Modal from '@/shared/components/modal/Modal';
import { validations } from '@/shared/vaildation/Validation';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const PasswordFindPage = () => {
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
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/findPasswordCertification`,
                {
                    userId: userId,
                    phoneNumber: userPhoneNumber
                },
                {withCredentials: true}
            );
            
            //인증 정보가 일치하면 새 비밀번호로 변경한다.
            if(res.status === 200) {
                try{
                    const res2 = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/changePassword`,
                        {
                            userId: userId,
                            newPassword: newPwd
                        },
                        {withCredentials: true}
                    )

                    if(res2.status === 200) {
                        setModalText('비밀번호가 변경되었습니다.');
                        setModalShow(true);
                        return;
                    }
                } catch(err) {
                    console.error(err);
                }
            }
        } catch(err) {
            console.error(err);
            setModalText('아이디 또는 휴대폰 번호가 일치하는 정보가 없습니다.');
            setModalShow(true);
            return;
        }
    };

    return (
        <main className='main auth-main'>
            <div className='inner'>
                <div className='auth-container'>
                    <div className='auth-top'>
                        <Image src={mascot} alt='마스코트' />
                        <p className='auth-text'>
                            비밀번호 변경을 위해 <br />
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
            </div>
        </main>
    );
};

export default PasswordFindPage;