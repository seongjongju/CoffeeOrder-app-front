import { CommonLabel, errColor, FormFieldContainer, FormFieldInput } from '@/shared/styled/GlobalStyled';
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
        <FormFieldContainer>
            <CommonLabel>
                {label}
                <span style={{ color: errColor }}>*</span>
            </CommonLabel>
            <FormFieldInput 
                placeholder={placeholder} 
                type={type} 
                value={value}
                onChange={onChange}
            />
        </FormFieldContainer>
    );
};

export default FindInput;