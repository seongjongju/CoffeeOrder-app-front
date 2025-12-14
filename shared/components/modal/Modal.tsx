'use client';
import React from 'react';
import '@/shared/styled/Modal/Modal.css';
import Button from '../button/Button';
import { usePathname, useRouter } from 'next/navigation';

interface ModalProps {
    modalShow: boolean;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
    modalText: string;
    setModalText: React.Dispatch<React.SetStateAction<string>>;
};

const Modal = ({ modalShow, setModalShow, modalText, setModalText } : ModalProps) => {
    const pathName = usePathname();
    const router = useRouter();

    const modalInit = () => {
        if(modalShow) {
            setModalShow(false);
            setModalText('');
            
            if(modalText === '아이디, 휴대폰 번호, 새 비밀번호를 입력해주세요.') {
                return;
            } else if (modalText === '비밀번호가 변경되었습니다.') {
                router.push('/login');
            }
        };
    }; 

    return (
        <div className='modal-container'>
            <div className='modal-item'>
                <div className='modal-info'>
                    <p className='text-body'>{modalText}</p>
                </div>
                <Button 
                    buttonText='확인'
                    onClick={modalInit}
                />
            </div>
        </div>
    );
};

export default Modal;