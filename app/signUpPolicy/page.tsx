import SignUpPolicy from '@/features/signUp/components/SignUpPolicy';
import React from 'react';

const SignUpPolicyPage = () => {
    return (
        <main>
            <section>
                <div className='inner'>
                    <SignUpPolicy />
                </div> {/* inner */}
            </section>
        </main>
    );
};

export default SignUpPolicyPage;