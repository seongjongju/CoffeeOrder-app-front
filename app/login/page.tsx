import LoginForm from '@/features/login/components/LoginForm';
import React from 'react';

const LoginPage = () => {
    return (
        <main style={{ position: 'relative', height: '100vh'}}>
            <section>
                <LoginForm />
            </section>
        </main>
    );
};

export default LoginPage;