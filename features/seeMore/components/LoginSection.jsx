import Link from 'next/link';
import React from 'react';
import styles from '../seeMore.module.css';

const LoginSection = () => {
    return (
        <section className={styles.login_section}>
            <div className='inner'>
                <Link href={'/login'} className={styles.seemore_link}>로그인/회원가입</Link>
            </div>
        </section>
    );
};

export default LoginSection;