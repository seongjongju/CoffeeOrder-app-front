import SignUpForm from '@/features/signUp/components/SignUpForm';
import React from 'react';

const SignUpPage = () => {
    return (
        <main>
            <section>
                <div className='inner'>
                    <h2 className='sub_title'>회원가입</h2>
                    <SignUpForm />
                </div> {/* inner */}
            </section>
        </main>
    );
};

export default SignUpPage