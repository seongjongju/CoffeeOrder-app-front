import React from 'react';

interface ButtonProps {
    buttonText: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ buttonText, onClick }:ButtonProps) => {
    return (
        <button 
            className='common-button'
            onClick={onClick}
        >
            {buttonText}
        </button>
    );
};

export default Button;