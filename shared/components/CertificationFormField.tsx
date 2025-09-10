import React from 'react';
import { CommonLabel, errColor, FormFieldContainer, FormFieldInput, CertificationButton, FormFieldFlex } from '../styled/GlobalStyled';
import { FormFieldProps } from './FormField';

const CertificationFormField = ({ label, placeholder, type, buttonText, onChange, value, errMessage, onBlur}:FormFieldProps) => {
    return (
        <FormFieldContainer>
            <CommonLabel>{label}<span style={{ color: errColor }}>*</span></CommonLabel>
            <FormFieldFlex>
                <FormFieldInput 
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                />
                <CertificationButton>{buttonText}</CertificationButton>
            </FormFieldFlex>
            <p style={{ color: errColor, fontSize: '12px', height: '17px' }}>
                {errMessage}
            </p>
        </FormFieldContainer>
    );
};

export default CertificationFormField;