'use client';

import React from 'react';
import modalStyles from './Modal.module.css';
import { ModalPropsTypes } from './types/modalTypes';

const Modal = ({modalText, modalClose}:ModalPropsTypes) => {
    return (
        <div className={modalStyles.modal_dim}>
            <div className={modalStyles.modal}>
                <p className={modalStyles.modal_text}>
                    {modalText}
                </p>
                <button 
                    className={modalStyles.modal_button}
                    type='button'
                    onClick={modalClose}
                >
                    확인
                </button>
            </div>
        </div>
    );
};

export default Modal;