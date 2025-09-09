import React from 'react';
import {CommonButton} from '../styled/GlobalStyled';

interface ButtonProps {
    buttonText: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ buttonText, onClick }:ButtonProps) => {
    return (
        <CommonButton
            onClick={onClick}
        >
            {buttonText}
        </CommonButton>
    );
};

export default Button;