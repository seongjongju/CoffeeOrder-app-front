import React from 'react';

interface ButtonProps {
    buttonText: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const CancelButton = ({ buttonText, onClick }:ButtonProps) => {
    return (
        <button 
            className='common-cancel-button'
            onClick={onClick}
        >
            {buttonText}
        </button>
    );
};

export default CancelButton;