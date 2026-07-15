'use client';
import React, { useState } from 'react';

const useConfilmShow = () => {
    const [confilmShow, setConfilmShow] = useState<boolean>(false);
    const [confilmText, setConfilmText] = useState<string>('');
    
    return {confilmShow, setConfilmShow, confilmText, setConfilmText};
};

export default useConfilmShow;