'use client';
import React, { useState } from 'react';

const useModalShow = () => {
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [modalText, setModalText] = useState<string>('');

    return {modalShow, setModalShow, modalText, setModalText};
};

export default useModalShow;