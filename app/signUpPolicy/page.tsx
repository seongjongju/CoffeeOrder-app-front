import SignUpPolicy from '@/features/signUp/components/SignUpPolicy';
import React from 'react';

const SignUpPolicyPage = () => {
    return (
        <main>
            <section>
                <div className='inner'>
                    <h2 className='title' style={{ textAlign : 'center' }}>회원가입</h2>
                    <SignUpPolicy />
                </div> {/* inner */}
            </section>
        </main>
    );
};

export default SignUpPolicyPage;