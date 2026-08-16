import '@/shared/client/styled/formField/formField.css';
import React from 'react';

export interface findProps {
    placeholder: string;
    type: string;
    name: string;
    autoComplete: string;
    label: string;
    value: string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
};

const FindInput = ({ placeholder, type, autoComplete, label, value, name, onChange }: findProps) => {
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
                name={name}
                autoComplete={autoComplete}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default FindInput;