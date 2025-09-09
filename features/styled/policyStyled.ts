'use client';
import { subColor1, subColor2, subGray } from "@/shared/styled/GlobalStyled";
import styled from "styled-components";
import checkOffIco from '@/shared/assets/images/icon/check_off.svg';
import checkOnIco from '@/shared/assets/images/icon/check_on.svg';

export const PolicyForm = styled.form `

`;

export const AllCheckedContainer = styled.div `
    padding-bottom: 14px;
    border-bottom: 1px solid ${subGray};
    margin-bottom: 20px;

    & label {
        display: flex;
        align-items: center;
        gap: 5px;
    }
`;

export const AllCheckedCustom = styled.div `
    position: relative;
    width: 20px;
    height: 20px;
`;

export const CheckedInput = styled.input `
    position: relative;
    width: 100%; 
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 1;

    &:checked + span {
        background-image: url(${checkOnIco.src})
    }
`;

export const CheckedShowHide = styled.span `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 100%;
    height: 100%;
    background: url(${checkOffIco.src}) no-repeat center / contain;
`;

export const CheckedContainer = styled.div `
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }

    & label {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-bottom: 5px;
    }
`;

export const CheckedCustom = styled.div `
    position: relative;
    width: 16px;
    height: 16px;
`;

export const PolicyInfo = styled.div `
    height: 100px;
    border: 1px solid ${subGray};
    border-radius: 5px;
    padding: 10px;
    overflow: auto;
`;

export const PolicyHeading = styled.p `
    font-size: 13px;
    color: ${subColor1};
    font-weight: 600;
    margin-bottom: 5px;
`;

export const Policytext = styled.p `
    font-size: 12px;
    color: ${subColor2};
    margin-bottom: 10px;
    word-break: keep-all;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const NextButtonContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    padding: 10px 20px 30px;
    z-index: 1;
    max-width: 600px;
`;
