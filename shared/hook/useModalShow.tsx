'use client';
import React, { useState } from 'react';

const useModalShow = () => {
    const [modalShow, setModalShow] = useState(false);

    return {modalShow, setModalShow};
};

export default useModalShow;