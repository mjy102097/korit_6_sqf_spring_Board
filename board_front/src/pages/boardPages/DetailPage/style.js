import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    margin: 50px auto 0px;
    width: 1100px;    
`;

export const header = css`
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    padding: 10px 15px;
    & > h1 {
        margin: 0;
        margin-bottom: 15px;
        font-size: 38px;
        cursor: default;
    }
`;

export const titleAndLike = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & button {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border: 1px solid #dbdbdb;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        background-color: #ffffff;
        cursor: pointer;

        & > svg {
            font-size: 45px;
        }

        /* &:hover {
            background-color: #fafafa;
        }
        
        &:active {
            background-color: #eeeeee;
        } */
    }
`;

export const divLike = css`
    transform: translate(-50%, -50%);
    position: absolute;
    top: 58%;
    left: 51%;
    color: white;
    font-size: 11px;
`;

export const divUnLike = css`
    transform: translate(-50%, -50%);
    position: absolute;
    top: 42%;
    left: 51%;
    color: white;
    font-size: 11px;
`;

export const boardInfocontainer = css`
    display: flex;
    justify-content: space-between;

    & span {
        margin-right: 10px;
        font-size: 14px;
        font-weight: 600;
        cursor: default;
    }

    & button {
        box-sizing: border-box;
        margin-left: 5px;
        border: 1px solid #dbdbdb;
        padding: 5px 20px;
        background-color: white;
        font-size: 12px;
        font-weight: 600;
        color: #333;
        cursor: pointer;
        &:hover {
            background-color: #fafafa;
        }
        &:active {
            background-color: #eeeeee;
        }
    }
`;

export const contentBox = css`
    box-sizing: border-box;
    margin-top: 5px;
    border: 1px solid #dbdbdb;
    padding: 12px 15px;
    & img:not(img[width]) {
        width: 100%;
    }
`;