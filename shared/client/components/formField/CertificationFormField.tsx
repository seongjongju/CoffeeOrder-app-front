import React from 'react';
import '@/shared/client/styled/formField/formField.css';
import { FormFieldProps } from './FormField';

const CertificationFormField = ({ label, placeholder, type, buttonText, onChange, value, onClick}:FormFieldProps) => {
    return (
        <div className='form-field-container'>
            <label className='label'>
                {label}<span style={{ color: "#FF4040" }}>*</span>
            </label>
            <div className='form-field-flex'>
                <input
                    className='form-field-input' 
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />
                <button
                    className='certification-button' 
                    onClick={onClick}
                >
                    {buttonText}
                </button>
            </div>
            <p style={{ color: "#FF4040", fontSize: '12px', height: '17px' }}><br /></p>
        </div>
    );
};

export default CertificationFormField;