import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    width: 460px;
`;

export const logo = css`
    display: flex;
    margin-bottom: 40px;
    font-size: 24px;
`;

export const joinInfoBox = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 100%;

    & input {
        box-sizing: border-box;
        border: none;
        width: 100%;
        height: 50px;
        font-size: 16px;
        outline: none;
    }

    & p {
        margin: 0px 0px 10px 10px;
        color: #ff2f2f;
        font-size: 14px;
    }

    & > div {
        box-sizing: border-box;
        border: 1px solid #dbdbdb;
        border-bottom: none;
        padding: 0px 20px;
    }

    & > div:nth-of-type(1) {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    & > div:nth-last-of-type(1) {
        border-bottom: 1px solid #dbdbdb;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
`;

export const joinButton = css`
    border: none;
    border-radius: 10px;
    width: 100%;
    height: 50px;
    background-color: #999999;
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;

    &:active {
        background-color: #444444;
    }
`;