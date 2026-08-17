'use client';
import { IsLoadingProps } from '@/shared/types/common';
import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingSpiner = ({isLoading}: IsLoadingProps) => {
    return (
        <div className='spiner-loading'>
            <ClipLoader 
                color={"#ffffff"}
                loading={isLoading}
                size={35}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default LoadingSpiner;