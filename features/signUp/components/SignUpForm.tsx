import React from 'react';
import formStyles from '@/shared/components/Form/Input/Input.module.css';
import InputWrap from '@/shared/components/Form/Input/InputWrap';
import Button from '@/shared/components/Form/Button/Button';

const SignUpForm = () => {
    return (   
        <form className={formStyles.common_form}>
            <InputWrap 
                label={'아이디'}
                placeholder={'아이디를 입력해주세요.'}
            />
            <InputWrap 
                label={'비밀번호'}
                placeholder={'비밀번호를 입력해주세요.'}
            />

            <InputWrap 
                label={'비밀번호 확인'}
                placeholder={'비밀번호 확인'}
            />

            <InputWrap 
                label={'이름'}
                placeholder={'이름을 입력해주세요.'}
            />

            <InputWrap 
                label={'휴대폰 번호'}
                placeholder={'-포함 입력'}
            />

            <InputWrap 
                label={'이메일'}
                placeholder={'abc@abc'}
            />

            <InputWrap 
                label={'이메일 인증'}
                placeholder={'인증번호를 입력하세요.'}
            />

            <Button 
                buttonText={'회원가입'}
            />
        </form> 
    );
};

export default SignUpForm;