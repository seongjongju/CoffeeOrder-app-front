'use client';
import { AuthContainer, AuthText, AuthTop } from '@/features/styled/authStyled';
import { Inner } from '@/shared/styled/GlobalStyled';
import Image from 'next/image';
import mascot from '@/shared/assets/images/contents/mascot.png';
import Button from '@/shared/components/Button';
import FindInput from '@/features/userFind/components/FindInput';
import { useState } from 'react';
import { validations } from '@/shared/vaildation/Validation';
import useModalShow from '@/shared/hook/useModalShow';
import Modal from '@/shared/components/Modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const IdFindPage = () => {
    const [findIdInput, setFindIdInput] = useState('');
    const {modalShow, setModalShow, modalText, setModalText} = useModalShow();
    const router = useRouter();

    const handleChangeFindId = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFindIdInput(e.target.value)
    };

    const findIdSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(findIdInput.trim() !== '') {
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
                setModalText('');
                setModalShow(false);

                router.push('/');
            }
        } catch(err) {
            
        }
    };

    return (
        <>
            <Inner>
                <AuthContainer>
                    <AuthTop>
                        <Image src={mascot} alt='마스코트' />
                        <AuthText>
                            아이디 찾기를 위해 <br />
                            이메일을 입력해 주세요!!
                        </AuthText>
                    </AuthTop>
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
                </AuthContainer>

                {
                    modalShow && 
                    <Modal 
                        modalShow={modalShow}
                        setModalShow={setModalShow}
                        modalText={modalText}
                        setModalText={setModalText}
                    />
                }
            </Inner> 
        </>
    );
};

export default IdFindPage;