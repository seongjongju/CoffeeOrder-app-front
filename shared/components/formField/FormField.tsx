import React from 'react';
import {CommonLabel, errColor, FormFieldContainer, FormFieldInput} from '../../styled/GlobalStyled';
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
        <FormFieldContainer>
            <CommonLabel>
                {label}
                {pathName !== '/login' ? <span style={{ color: errColor }}>*</span> : null}
            </CommonLabel>
            <FormFieldInput 
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
            />
            <p style={{ color: errColor, fontSize: '12px', height: '17px' }}>
                {errMessage}
            </p>
        </FormFieldContainer>
    );
};

export default FormField;