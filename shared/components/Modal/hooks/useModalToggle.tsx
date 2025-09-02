'use client';

import React, { useState } from 'react';
import { ModalTypes } from '../types/modalTypes';
import { useRouter } from 'next/navigation';

const useModalToggle = (): ModalTypes => {
    const [modalActive, setModalActive] = useState(false);
    const router = useRouter();

    console.log(modalActive);

    const signUpNextOnClick = (e:React.MouseEvent<HTMLButtonElement>, checked: boolean) => {
        e.preventDefault();

        if(checked === false) {
            setModalActive(true);
        } else {
            router.push('/signUp');
        }
    };

    const modalClose = () => setModalActive(false);

    return {setModalActive, modalActive, signUpNextOnClick, modalClose}
};

export default useModalToggle;