'use client';

import React from 'react';
import formStyles from '@/shared/components/Form/Input/Input.module.css';
import { FormElementTypes } from '../types/formTypes';
import { usePathname } from 'next/navigation';

const InputWrap = ({ label, placeholder }:FormElementTypes) => {
    const pathName = usePathname();

    return (
        <div className={formStyles.common_input_wrap}>
            <label className={formStyles.common_label}>{label}</label>
            <input 
                className={formStyles.common_input}
                placeholder={placeholder}
            />
            {
                pathName === '/signUp' && label === '아이디' ? (<button className={formStyles.duplication_button}>중복확인</button>)
                : null
            }
        </div>
    );
};

export default InputWrap;