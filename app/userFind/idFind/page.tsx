'use client';
import '@/shared/styled/authStyle/authStyle.css';
import Image from 'next/image';
import mascot from '@/public/images/mascot.png';
import Button from '@/shared/components/button/Button';
import FindInput from '@/features/userFind/components/FindInput';
import { useState } from 'react';
import { validations } from '@/shared/vaildation/Validation';
import useModalShow from '@/shared/components/modal/hook/useModalShow';
import Modal from '@/shared/components/modal/Modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AppBar from '@/shared/components/appbar/AppBar';

const IdFindPage = () => {
    const [findIdInput, setFindIdInput] = useState('');
    const {modalShow, setModalShow, modalText, setModalText} = useModalShow();
    const router = useRouter();

    const handleChangeFindId = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFindIdInput(e.target.value)
    };

    const findIdSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(findIdInput.trim() === '') {
            setModalText('이메일을 입력해 주세요.');
            setModalShow(true);
            return;
        }
        
        if(!validations.emailRegex.test(findIdInput.trim())) {
            setModalText('이메일 형식이 올바르지않습니다.');
            setModalShow(true);
            return;
        };

        try {
            const res = await axios.post('http://localhost:4000/api/users/findId',
                {
                    email: findIdInput
                },
                {withCredentials: true}
            );

            if(res.status === 200) {
                router.push(`/userFind/idFindResult?userId=${res.data.userId}`);
            }
        } catch(err) {
            console.error(err);
            setModalText('가입되지 않은 이메일입니다.');
            setModalShow(true);
            return;
        } 
    };

    return (
        <>
            <div className='inner'>
                <div className='auth-container'>
                    <div className='auth-top'>
                        <Image src={mascot} alt='마스코트' />
                        <p className='auth-text'>
                            아이디 찾기를 위해 <br />
                            이메일을 입력해 주세요!!
                        </p>
                    </div>
                    <form onSubmit={findIdSubmit}>
                        <FindInput
                            placeholder='이메일을 입력해주세요.'
                            type='email'
                            label='이메일'
                            value={findIdInput}
                            onChange={handleChangeFindId}
                        />
                        <Button 
                            buttonText='아이디 찾기'
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
        </>
    );
};

export default IdFindPage;