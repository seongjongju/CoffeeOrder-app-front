import '@/shared/client/styled/loading/loading.css';
import BigMascot from '@/public/icons/big_mascot.png';
import React from 'react';

const LoadingUi = () => {
    return (
        <div className='loading'>
            <img  src={BigMascot.src} alt='머그컵 캐릭터' />
        </div>
    );
};

export default LoadingUi;