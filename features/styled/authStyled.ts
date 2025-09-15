'use client';
import { mainColor, subColor1 } from "@/shared/styled/GlobalStyled";
import styled from "styled-components";

export const AuthContainer = styled.div `
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

export const AuthTop = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

export const AuthText = styled.p `
    text-align: center;
    font-size: 20px;
    color: ${mainColor};
    font-weight: 700;
`;

export const AuthLinks = styled.div `
    display:flex; 
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;

    & a {
        font-size: 12px;
        color: ${subColor1}
    }
`;