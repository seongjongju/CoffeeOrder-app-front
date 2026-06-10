'use client';
import React, { useState } from 'react';

const useAdminModal = () => {
    const [modalToggle, setModalToggle] = useState<string>("");

    return {
        setModalToggle,
        modalToggle
    }
};

export default useAdminModal;