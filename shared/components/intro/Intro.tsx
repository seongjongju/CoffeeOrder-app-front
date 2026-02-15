import React from 'react';
import '@/shared/styled/intro/intro.css';
import BigMascot from '@/public/icons/big_mascot.png';
import Image from 'next/image';
import Link from 'next/link';

interface introProps {
    isLoggedIn: boolean;
};

const Intro = ({ isLoggedIn }:introProps) => {
    return (
        <div className='intro-container'>
            <Image className='intro-image' src={BigMascot} alt='머그컵 캐릭터' />
            {
                isLoggedIn ? 
                (
                    <div className='intro-buttons'>
                        <Link className='intro-link' href={'/policy'} >가입하기</Link>
                        <Link className='intro-link' href={'/login'} >로그인</Link>
                    </div>
                ) : null
            }
        </div>
    );
};

export default Intro;