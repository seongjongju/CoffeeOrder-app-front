import React from 'react';
import styles from '@/shared/components/Form/Input/Input.module.css';
import { FormElementTypes } from '../types/formTypes';

const InputWrap = ({ label, placeholder }:FormElementTypes) => {
    return (
        <div className={styles.common_input_wrap}>
            <label className={styles.common_label}>{label}</label>
            <input 
                className={styles.common_input}
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputWrap;