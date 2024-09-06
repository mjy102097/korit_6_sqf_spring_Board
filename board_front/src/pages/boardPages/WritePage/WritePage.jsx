/** @jsxImportSource @emotion/react */
import ReactQuill, { Quill } from "react-quill";
import * as s from "./style";
import 'react-quill/dist/quill.snow.css';
import { useCallback, useRef, useState } from "react";
import ImageResize from "quill-image-resize"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase/firebase";
import { v4 as uuid } from "uuid";
import { CircleLoader } from "react-spinners";
import { boardApi } from "../../../apis/boardApi";
import { useNavigate } from "react-router-dom";
import { instance } from "../../../apis/util/instance";
Quill.register("modules/ImageResize", ImageResize);

function WritePage(props) {
    const navigator = useNavigate();
    const [board, setBoard] = useState({
        title: "",
        content: ""
    });

    const quillRef = useRef(null);
    const [isUploading, setUploading] = useState(false);

    const handleWriteSubmitOnClick = async () => {
        boardApi(board)
            .then((response) => {
                alert("작성이 완료 되었습니다.");
                navigator(`/board/detail/${response.boardId}`);
            })
            .catch((error) => {
                console.log(error);
                const fieldErrors = error.response.data;

                for(let fieldError of fieldErrors) {
                    if(fieldError.field === "title") {
                        alert(fieldError.message);
                        return;
                    }
                }
                for(let fieldError of fieldErrors) {
                    if(fieldError.field === "content") {
                        alert(fieldError.message);
                        return;
                    }
                }
            });

        //  비동기 처리
        // try {
        //     const response = await instance.post("/board", board);
        //     alert("작성완료 A A await!");
        //     navigator(`/board/detail/${response.data.boardId}`);
        // } catch (error) {
        //     const fieldErrors = error.response.data;

        //     for (let fieldError of fieldErrors) {
        //         if (fieldError.field === "title") {
        //             alert(fieldError.message);
        //             return;
        //         }
        //     }
        //     for (let fieldError of fieldErrors) {
        //         if (fieldError.field === "content") {
        //             alert(fieldError.message);
        //             return;
        //         }
        //     }
        // }

        setBoard({
            title: "",
            content: ""
        })

    }

    const handleTitleInputOnChange = (e) => {
        setBoard(board => ({
            ...board,
            [e.target.name]: e.target.value
        }));
    }

    const handleQuillValueOnChange = (value) => {
        setBoard(board => ({
            ...board,
            content: quillRef.current.getEditor().getText().trim() === "" ? "" : value
        }));
    }

    const handleImageLoad = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.click();

        input.onchange = () => {
            const editor = quillRef.current.getEditor();
            const files = Array.from(input.files);
            const imgFile = files[0];

            const editPoint = editor.getSelection(true);

            const storageRef = ref(storage, `board/img/${uuid()}_${imgFile.com}`);
            const task = uploadBytesResumable(storageRef, imgFile);
            task.on(
                "state_changed",
                () => { },
                () => { },
                async () => {
                    const url = await getDownloadURL(storageRef);
                    editor.insertEmbed(editPoint.index, "image", url);
                    editor.setSelection(editPoint.index + 1);
                    editor.insertText(editPoint.index + 1, "\n");
                    setUploading(false);
                },
            )

        }
    }, []);

    const toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }], [{ 'align': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video', 'formula'],
        ['blockquote', 'code-block'],
    ];

    return (
        <div css={s.layout}>
            <header css={s.header}>
                <h1>Quill Edit</h1>
                <button onClick={handleWriteSubmitOnClick}>작성하기</button>
            </header>
            <input type="text" name="title" css={s.titleInput} onChange={handleTitleInputOnChange} value={board.title} placeholder="게시글의 제목을 입력하세요." />
            <div css={s.editorLayout}>
                {
                    isUploading &&
                    <div css={s.loadingLayout}>
                        <CircleLoader />
                    </div>
                }
                <ReactQuill
                    ref={quillRef}
                    style={{
                        boxSizing: "border-box",
                        width: "100%",
                        height: "100%",
                    }}
                    onChange={handleQuillValueOnChange}
                    modules={{
                        toolbar: {
                            container: toolbarOptions,
                            handlers: {
                                image: handleImageLoad
                            }
                        },
                        ImageResize: {
                            parchment: Quill.import('parchment')
                        }
                    }}
                    value={board.content}
                />
            </div>
        </div>
    );
}

export default WritePage;