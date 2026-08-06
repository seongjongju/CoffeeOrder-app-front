'use client';
import React, { useState } from 'react';

const useLoading = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return {isLoading, setIsLoading}
};

export default useLoading;