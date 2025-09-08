import React from 'react';
import { IntroContainer, IntroImage, IntroButtons, IntroLink } from '../styled/GlobalStyled';
import BigMascot from '../assets/images/icon/big_mascot.png';

const Intro = () => {
    return (
        <IntroContainer>
            <IntroImage src={BigMascot} alt='머그컵 캐릭터' />
            <IntroButtons>
                <IntroLink href={'/policy'} >가입하기</IntroLink>
                <IntroLink href={'/login'} >로그인</IntroLink>
            </IntroButtons>
        </IntroContainer>
    );
};

export default Intro;