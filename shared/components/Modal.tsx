import React from 'react';
import {ModalContainer, ModalItem, ModalInfo, TextBody} from '../styled/GlobalStyled';
import Button from './Button';

interface ModalProps {
    modalShow: boolean;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ modalShow, setModalShow } : ModalProps) => {
    return (
        <ModalContainer>
            <ModalItem>
                <ModalInfo>
                    <TextBody>약관에 동의해주세요.</TextBody>
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