import React from 'react';
import '@/shared/client/styled/formField/formField.css';
import { usePathname } from 'next/navigation';

export interface FormFieldProps {
    label: string;
    placeholder: string;
    type: string;
    buttonText?: string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    errMessage?: string;
    onBlur?: (e:React.FocusEvent<HTMLInputElement>) => void;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const FormField = ({ label, placeholder, type, onChange, value, errMessage, onBlur}:FormFieldProps) => {
    const pathName = usePathname();
    return (
        <div className='form-field-container'>
            <label className='label'>
                {label}
                {pathName !== '/login' ? <span style={{ color: "#FF4040" }}>*</span> : null}
            </label>
            <input 
                className='form-field-input'
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