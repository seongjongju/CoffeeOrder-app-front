'use client';
import React from 'react';
import '@/shared/client/styled/modal/modal.css';
import Button from '../../components/button/Button';
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

    const modalInit = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(modalShow) {
            setModalShow(false);
            setModalText('');
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