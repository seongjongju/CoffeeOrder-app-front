'use client';
import React, { useEffect, useState } from 'react';

const useLoading = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const handleLoad = () => {
            setIsLoading(false);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            return () => {setIsLoading(true)}
        }
    }, []);

    return {isLoading}
};

export default useLoading;