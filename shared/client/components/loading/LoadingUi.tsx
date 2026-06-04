import '@/shared/client/styled/loading/loading.css';
import Image from 'next/image';
import BigMascot from '@/public/icons/big_mascot.png';
import React from 'react';

const LoadingUi = () => {
    return (
        <div className='loading'>
            <Image  src={BigMascot} alt='머그컵 캐릭터' />
        </div>
    );
};

export default LoadingUi;