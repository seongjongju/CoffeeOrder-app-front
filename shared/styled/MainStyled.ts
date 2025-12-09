import styled from "styled-components";
import { mainColor, subColor1, subColor2 } from "./GlobalStyled";
import Link from "next/link";

export const Main = styled.main `
    padding: 78px 0 30px;
`;

export const MainTitle = styled.h2 `
    font-size: 20px;
    font-weight: 800;
    color: ${mainColor};
    margin-bottom: 10px;
`;

export const Visual = styled.div `
    width: 100%;
    aspect-ratio: 335 / 150;
    margin-bottom: 20px;

    & img {
        width: 100%;
        height: 100%;
    }
`;

export const MenuSwiperLink = styled(Link) `
    display: block;
    width: 100%;
    aspect-ratio: 1 / 1;

    & img {
        width: 100%;
        height: 100%;
        border: 1px solid #ddd;
        border-radius: 10px;
    }

    & p {
        font-size: 14px;
        color: #222;
        text-align: center;
    }
`;

//tab
export const TabBtns = styled.div `
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 10px;
`;

export const TabBtn = styled.button `
    font-family: 'Pretendard', sans-serif;
    padding: 5px 20px;
    border: 1px solid ${mainColor};
    border-radius: 35px;
    font-size: 16px;
    color: ${mainColor};
    font-weight: 500;
`;

export const MenuTabInput = styled.input `
    font-family: 'Pretendard', sans-serif;
    display: block; 
    width: 100%;
    height: 38px;
    border-radius: 8px;
    border: 1px solid #ddd;
    padding-left: 10px;
    outline: none;
    font-size: 16px;
    color: ${mainColor};
    margin-bottom: 10px;
`;

export const MenuWrap = styled.div `
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`;

export const MenuItem = styled.div `
    border: 1px solid #ddd;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    background: ${mainColor};

    & img {
        width: 95%;
        height: 95%;
        display: block;
        margin: 0 auto;
    }

    & p {
        font-size: 14px;
        color: #fff;
        text-align: center;
        position: absolute;
        bottom: 5%;
        width: 100%;
    }
`;

export const FailTextWrap = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ddd;
    border-radius: 8px;
    height: 300px;

    & p {
        font-siez: 18px;
        color: ${mainColor};
        font-weight: 600;
    }
`;

export default styled;