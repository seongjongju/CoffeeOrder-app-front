import React from 'react';
import '@/shared/client/styled/formField/formField.css';
import { usePathname } from 'next/navigation';
import { FormFields } from '../../../types/common';

const FormField = ({ label, placeholder, type, autoComplete, onChange, value, errMessage, onBlur}:FormFields) => {
    const pathName = usePathname();
    return (
        <div className='form-field-container'>
            <label className='label'>
                {label}
                {pathName !== '/login' ? <span style={{ color: "#FF4040" }}>*</span> : null}
            </label>
            <input 
                className='form-field-input'
                autoComplete={autoComplete}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
            />
            <p style={{ color: "#FF4040", fontSize: '12px', height: '17px' }}>
                {errMessage}
            </p>
        </div>
    );
};

export default FormField;