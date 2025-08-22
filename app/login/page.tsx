import LoginForm from '@/features/login/components/LoginForm';
import React from 'react';

const LoginPage = () => {
    return (
        <main>
            <section>
                <div className='inner'>
                    <h2 className='title' style={{ textAlign : 'center' }}>로그인</h2>
                    <LoginForm />
                </div> {/* inner */}
            </section>
        </main>
    );
};

export default LoginPage;