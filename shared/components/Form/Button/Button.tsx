import React from 'react';
import styles from './Button.module.css';
import { ButtonTypes } from '../types/formTypes';

const Button = ({ buttonText }:ButtonTypes) => {
    return (
        <button className={styles.common_button}>
            {buttonText}
        </button>
    );
};

export default Button;