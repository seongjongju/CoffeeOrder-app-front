import { CommonLabel, errColor, FormFieldContainer, FormFieldInput } from '@/shared/styled/GlobalStyled';
import React from 'react';

export interface changeInfoInputProps {
    label: string,
    placeholder: string,
    value: string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
};

const ChangeInfoInput = ({ label, placeholder, value, onChange }: changeInfoInputProps) => {
    return (
        <FormFieldContainer>
            <CommonLabel>   
                {label}
                <span style={{ color: errColor }}>*</span>
            </CommonLabel>
            <FormFieldInput 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </FormFieldContainer>
    );
};

export default ChangeInfoInput;