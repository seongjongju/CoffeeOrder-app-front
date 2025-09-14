"use client";
import Image from "next/image";
import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";

//global
const GlobalStyle = createGlobalStyle`
  * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        height: 100vh;
        background-color: #f5f5f5;
        padding-top: env(safe-area-inset-top);
        padding-bottom: env(safe-area-inset-bottom);
        padding-left: env(safe-area-inset-left);
        padding-right: env(safe-area-inset-right);
    }

    body {
        font-family: 'Pretendard', sans-serif;
        background: #fff;
        max-width: 600px;
        height: 100vh;
        min-height: 100vh;
        margin: 0 auto;
        padding-top: env(safe-area-inset-top);
        padding-bottom: env(safe-area-inset-bottom);
        padding-left: env(safe-area-inset-left);
        padding-right: env(safe-area-inset-right);
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
    }
`;

//common
export const mainColor = '#2B1B16';
export const subGray = '#ddd';
export const errColor = '#FF4040';
export const subColor1 = '#555555';
export const subColor2 = '#888888';

export const TextBody = styled.p `
    font-size: 14px;
    color: #333;
    word-break: keep-all;
    font-weight: 400;
`;

export const Inner = styled.div`
    padding: 0 20px;
    margin: 0 auto;
`;
export const Section = styled.section `
    padding-bottom: 90px;
    box-sizing: border-box;
`;
export const Title = styled.h2`
    font-size: 20px;
    color: ${mainColor};
    margin-bottom: 30px;
`;
export const CommonLabel = styled.label `
    display: block; 
    font-size: 14px;
    font-weight: 600;
    color: ${mainColor};
    width: fit-content;
`;
export const CommonButton = styled.button `
    width: 100%;
    height: 48px;
    background-color: ${mainColor};
    color: #fff;
    border-radius: 5px;
    font-size: 14px;
`;

//intro
export const IntroContainer = styled.div`
    height: 100vh;
    background-color: ${mainColor};
    padding: 0 20px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`;

export const IntroImage = styled(Image)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -80%);
`;

export const IntroButtons = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    padding-bottom: 35px;
`;

export const IntroLink = styled(Link)`
    display: block;
    width: 100%;
    text-align: center;
    line-height: 48px;
    background-color: rgba(255, 255, 255, 0.1);
    font-size: 14px;
    color: #fff;
    border-radius: 5px;
`;

//AppBar
export const AppBarContainer = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    border-bottom: 1px solid ${subGray};
    background-color: #fff;
    padding: 0 20px;
    display: flex; 
    align-items: center;
    margin-bottom: 30px;
`;

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    height: fit-content;
`;

export const AppBarTitle = styled.h2`
    font-size: 20px;
    color: ${mainColor};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

//NavigationBar
export const NaviContainer = styled.div `
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 600px;
    padding: 10px 20px 30px;
    background-color: #fff;
`;

//NextButtonContainer
export const NextButtonContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    padding: 10px 20px 30px;
    z-index: 1;
    max-width: 600px;
    background-color: #fff;
`;

//Modal
export const ModalContainer = styled.div `
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100vh;
    max-width: 600px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

export const ModalItem = styled.div `
    width: 100%;
    height: 170px;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;

    & button {
        border-radius: 0;
    }
`;

export const ModalInfo = styled.div `
    height: calc(100% - 48px);
    display: flex; 
    justify-content: center;
    align-items: center;
`;

//FormField
export const FormFieldContainer = styled.div `
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    };
`;

export const FormFieldInput = styled.input `
    display: block;
    width: 100%;
    height: 35px;
    outline: none;
    border: none;
    border-bottom: 1px solid ${subGray};
    color: #333;
    font-size: 16px;

    &::placeholder {
        font-size: 14px;
    }
`;

export const FormFieldFlex = styled.div `
    display: flex;
    align-items: center;

    & input {
        width: calc(100% - 100px);
    }
`;

export const CertificationButton = styled.button `
    width: 100px;
    height: 34px;
    background-color: ${mainColor};
    color: #fff;
    font-size: 12px;
    border-radius: 34px;
`;
export default GlobalStyle