import React from 'react';
import Image from 'next/image';
import mainBanner from '@/public/images/mainBanner.jpg';

const MainVisual = () => {
    return (
        <div className='inner'>
            <div className='visual'>
                <Image src={mainBanner} alt='메인 배너' />
            </div>
        </div>
    );
};

export default MainVisual;