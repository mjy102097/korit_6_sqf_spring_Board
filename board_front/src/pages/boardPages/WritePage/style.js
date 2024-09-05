import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    margin: 0 auto;
    padding-top: 30px;
    width: 1100px;
`;

export const titleInput = css`
    box-sizing: border-box;
    margin-bottom: 10px;
    border: 1px solid #c0c0c0;
    outline: none;
    padding: 12px 15px;
    width: 100%;
    font-size: 16px;
`;

export const editorLayout = css`
    box-sizing: border-box;
    margin-bottom: 42px;
    width: 100%;
    height: 800px;
`;

export const header = css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 10px 0px;

    & > h1 {
        margin: 0;
    }

    & > button {
        box-sizing: border-box;
        border: 1px solid #dbdbdb;
        padding: 6px 15px;
        background-color: white;
        font-size: 12px;
        font-weight: 600;
        color: #333;
        cursor: pointer;

        &:hover {
            background-color: #fafafa;
        }
        &:active {
            background-color: #eee;
        }
    }
`;

export const loadingLayout = css`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 98;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #00000066;
`;

export const img2 = css`
    display: flex;
    background-image: url('https://i1.ruliweb.com/ori/17/04/23/15b9a751497159acd.gif');
    width: 100%;
    height: 100%;
`