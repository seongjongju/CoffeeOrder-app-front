'use client';
import React, { useEffect, useState } from 'react';

const usePolicyChecked = () => {
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [isPolicyChecked, setPolicyChecked] = useState(false);
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

    const allCheck = () => {
        const next = !isAllChecked;
        setIsAllChecked(next);
        setPolicyChecked(next);
        setIsPrivacyChecked(next);
    }; 

    const policyCheck = () => {
        setPolicyChecked(prev => !prev);
    };

    const privacyCheck = () => {
        setIsPrivacyChecked(prev => !prev);
    };

    useEffect(() => {
        if(isPolicyChecked && isPrivacyChecked) setIsAllChecked(true)
        else setIsAllChecked(false)
    }, [isPolicyChecked, isPrivacyChecked]);

    const checkedState = {isAllChecked, isPolicyChecked, isPrivacyChecked}
    const checkedFunction = {policyCheck, privacyCheck, allCheck}

    return {checkedState, checkedFunction}
};

export default usePolicyChecked;