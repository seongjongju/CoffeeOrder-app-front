import React from 'react';
import '@/shared/client/styled/common/common.css';

interface SpinerButtonProps {
    isLoading: boolean;
    buttonText?: string;
};

const SpinerButton = ({isLoading, buttonText}: SpinerButtonProps) => {
    return (
        <button
            style={{
                cursor: isLoading ? "not-allowed" : "pointer",
                pointerEvents: isLoading ? "none" : "auto" 
            }} 
            className='common-button'
        >
            {
                isLoading ? 
                (
                    <div className='auth-dots'>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                ) : 
                buttonText
            }
        </button>
    );
};

export default SpinerButton;