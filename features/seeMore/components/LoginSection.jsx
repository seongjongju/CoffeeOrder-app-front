import Link from 'next/link';
import React from 'react';
import seeMoreStyles from '../seeMore.module.css';

const LoginSection = () => {
    return (
        <Link href={'/login'} className={seeMoreStyles.seemore_link}>로그인/회원가입</Link>
    );
};

export default LoginSection;