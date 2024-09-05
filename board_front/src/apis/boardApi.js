import { instance } from "./util/instance";

export const boardApi = async(data) => {
    let boardData = {
        boardId: 0,
        error: ""
    };
    try {
        const response = await instance.post("/board", data)
        boardData = {
            boardId: response.data
        }
    } catch(e) {
        const response = e.response;
        boardData = {
            boardId: 0,
            error: response.data[0]?.defaultMessage
        }
    }
    return boardData;
}