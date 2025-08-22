import React from 'react';
import buttonStyles from './Button.module.css';
import { ButtonTypes } from '../types/formTypes';

const Button = ({ buttonText }:ButtonTypes) => {
    return (
        <button className={buttonStyles.common_button}>
            {buttonText}
        </button>
    );
};

export default Button;