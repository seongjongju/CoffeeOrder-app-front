'use client';

import React, { useState } from 'react';
import { PolicyTypes } from '../types/signUpTypes';

const usePolicyChecked = (): PolicyTypes => {
    const [policyIsChecked, setPolicyIsChecked] = useState(false);

    const togglePolicy = () => {
        setPolicyIsChecked(prev => !prev)
    };

    return {policyIsChecked, togglePolicy}
};

export default usePolicyChecked;