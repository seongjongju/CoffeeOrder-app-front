import SignUpForm from '@/features/signUp/components/SignUpForm';
import React from 'react';

const SignUpPage = () => {
    return (
        <main>
            <section>
                <div className='inner'>
                    <SignUpForm />
                </div> {/* inner */}
            </section>
        </main>
    );
};

export default SignUpPage