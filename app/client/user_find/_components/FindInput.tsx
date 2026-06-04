import '@/shared/client/styled/formField/formField.css';
import React from 'react';

export interface findProps {
    placeholder: string,
    type: string,
    label: string,
    value: string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
};

const FindInput = ({ placeholder, type, label, value, onChange }: findProps) => {
    return (
        <div className='form-field-container'>
            <label className='label'>
                {label}
                <span style={{ color: "#FF4040" }}>*</span>
            </label>
            <input
                className='form-field-input' 
                placeholder={placeholder} 
                type={type} 
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default FindInput;