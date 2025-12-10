'use client';
import React from 'react';
import {ModalContainer, ModalItem, ModalInfo, TextBody} from '../../styled/GlobalStyled';
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

            if(pathName === '/userFind/passwordFind') {
                router.push('/login');
            }
        };
    }; 

    return (
        <ModalContainer>
            <ModalItem>
                <ModalInfo>
                    <TextBody>{modalText}</TextBody>
                </ModalInfo>
                <Button 
                    buttonText='확인'
                    onClick={modalInit}
                />
            </ModalItem>
        </ModalContainer>
    );
};

export default Modal;