import React from 'react';
import {ModalContainer, ModalItem, ModalInfo, TextBody} from '../styled/GlobalStyled';
import Button from './Button';

interface ModalProps {
    modalShow: boolean;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
    modalText: string;
};

const Modal = ({ modalShow, setModalShow, modalText } : ModalProps) => {
    return (
        <ModalContainer>
            <ModalItem>
                <ModalInfo>
                    <TextBody>{modalText}</TextBody>
                </ModalInfo>
                <Button 
                    buttonText='확인'
                    onClick={(e) => {
                        e.preventDefault();
                        modalShow === true ? setModalShow(false) : null
                    }}
                />
            </ModalItem>
        </ModalContainer>
    );
};

export default Modal;