import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 100px 200px;
`;

export const header = css`
    display: flex;
    justify-content: center;
    margin-bottom: 40px;

    & > input {
        box-sizing: border-box;
        width:  50%;
        height: 50px;
        border: 2px solid #dbdbdb;
        border-radius: 50px;
        padding: 10px 20px;
        outline: none;
        cursor: pointer;
        ::-webkit-search-cancel-button {
            cursor: pointer;
        }
    }
`;

export const main = css`
    display: flex;
    justify-content: space-between;
`;

export const leftBox = css`
    box-sizing: border-box;
    border: 2px solid #dbdbdb;
    border-radius: 10px;
    width: 64%;
`;

export const rightBox = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #dbdbdb;
    border-radius: 10px;
    width: 35%;
    padding: 20px;

    & > button {
        margin-bottom: 10px;
        width: 100%;
        height: 40px;
        font-size: 16px;
        font-weight: 600;
    }

    & > div {
        display: flex;
        justify-content: center;
        width: 100%;
        
        & > a:not(:nth-last-of-type(1))::after {
            display: inline-block;
            content: "";
            margin: 0px 5px;
            border-left: 1px solid #222222;
            height: 60%;
        }
    }
`;

export const userInfoBox = css`
    display: flex;
    justify-content: flex-start;
    width: 100%;
`;

export const profileImgBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    box-shadow: 0px 0px 2px #00000088;
    cursor: pointer;
    overflow: hidden;
    & > img {
        height: 100%;
    }
`;

export const profileInfo = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    padding: 10px;
    & > button {
        box-sizing: border-box;
        border: 1px solid #dbdbdb;
        border-radius: 37px;
        padding: 5px 10px;
        height: 37px;
        background-color: #ffffff;
        color: #555555;
        font-size: 16px;
        cursor: pointer;
    }
`;