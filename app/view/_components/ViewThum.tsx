'use client';
import React from 'react';

interface thumNailType {
    thum: string,
    menuName: string
};

const ViewThum = ({ thum, menuName }:thumNailType) => {
    return (
        <div className='view-thum'>
            <img src={thum} alt={menuName} className='view-thum__image' />
            <p className='view-thum__title'>{menuName}</p>
        </div> 
    );
};

export default ViewThum;