'use client';

import React from 'react';
import signUpStyles from '../signUp.module.css';
import buttonStyles from '@/shared/components/Form/Button/Button.module.css';
import SignUpPolicyInfo from './SignUpPolicyInfo';
import usePolicyChecked from '../hooks/usePolicyChecked';
import Modal from '@/shared/components/Modal/Modal';
import useModalToggle from '@/shared/components/Modal/hooks/useModalToggle';

const SignUpPolicy = () => {
    const {policyIsChecked, togglePolicy} = usePolicyChecked();
    const {modalActive, signUpNextOnClick, modalClose} = useModalToggle();

    return (
        <>
            <SignUpPolicyInfo />
            <div className={signUpStyles.signup_checked_wrap}>
                <input 
                    type="checkbox" 
                    checked={policyIsChecked}
                    onChange={togglePolicy}
                />
                <label className={signUpStyles.signup_checked_label}>개인정보처리방침에 동의</label>
            </div>
            <button 
                className={buttonStyles.common_button_short}
                onClick={(e) => signUpNextOnClick(e, policyIsChecked)}
            >
                다음
            </button>

            {
                modalActive && (
                    <Modal 
                        modalText={'이용약관에 동의해주세요!'}
                        modalClose={modalClose} 
                    />
                )
            }
        </>
    );
};

export default SignUpPolicy;