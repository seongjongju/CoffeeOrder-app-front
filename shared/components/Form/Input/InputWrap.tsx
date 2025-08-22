import React from 'react';
import formStyles from '@/shared/components/Form/Input/Input.module.css';
import { FormElementTypes } from '../types/formTypes';

const InputWrap = ({ label, placeholder }:FormElementTypes) => {
    return (
        <div className={formStyles.common_input_wrap}>
            <label className={formStyles.common_label}>{label}</label>
            <input 
                className={formStyles.common_input}
                placeholder={placeholder}
            />
            {
                label === '아이디' ? (<button className={formStyles.duplication_button}>중복확인</button>)
                : null
            }
        </div>
    );
};

export default InputWrap;