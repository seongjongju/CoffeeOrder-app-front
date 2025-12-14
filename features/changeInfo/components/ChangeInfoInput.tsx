import '@/shared/styled/formField/formField.css';
import React from 'react';
export interface changeInfoInputProps {
    label: string,
    placeholder: string,
    value: string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
};

const ChangeInfoInput = ({ label, placeholder, value, onChange }: changeInfoInputProps) => {
    return (
        <div className='form-field-container'>
            <label className='label'>   
                {label}
                <span style={{ color: "#FF4040" }}>*</span>
            </label>
            <input
                className='form-field-input' 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default ChangeInfoInput;