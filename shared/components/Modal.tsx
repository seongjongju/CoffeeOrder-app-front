import React from 'react';
import {ModalContainer, ModalItem, ModalInfo, TextBody} from '../styled/GlobalStyled';
import Button from './Button';

interface ModalProps {
    modalShow: boolean;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
    modalText: string;
    setModalText: React.Dispatch<React.SetStateAction<string>>;
};

const Modal = ({ modalShow, setModalShow, modalText, setModalText } : ModalProps) => {
    const modalInit = () => {
        if(modalShow) {
            setModalShow(false);
            setModalText('');
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