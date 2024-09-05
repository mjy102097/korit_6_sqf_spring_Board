/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useQueryClient } from "react-query";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { v4 as uuid } from 'uuid';
import { useState } from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { updateProfileImgApi } from "../../apis/userApi";

const layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 100px auto;
    width: 1000px;
`;

const imgBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 300px;
    height: 300px;
    box-shadow: 0px 0px 2px #00000088;
    cursor: pointer;
    overflow: hidden;

    & > img {
        height: 100%;
    }
`;

const progressBox = css`
    padding-top: 30px;
    width: 300px;
`;

function UserProfilePage(props) {
    const queryClient = useQueryClient();
    const userInfoState = queryClient.getQueryState("userInfoQuery");
    const [ uploadPercent, setUploadPercent ] = useState(0);

    const handleImageChangeOnClick = () => {
        if(window.confirm("프로필 사진을 변경하겠습니까?")) {
            const fileInput = document.createElement("input");
            fileInput.setAttribute("type", "file");
            fileInput.setAttribute("accept", "image/*");
            fileInput.click();
            
            fileInput.onchange =  (e) => {
                const files = Array.from(e.target.files);
                const profileImage = files[0];
                setUploadPercent(0);

                const storageRef = ref(storage, `user/profile/${uuid()}_${profileImage.name}`);
                const uploadTask = uploadBytesResumable(storageRef, profileImage);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        setUploadPercent(
                            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                    },
                    (error) => {
                        console.log(error);
                    },
                    async (success) => {
                        const url = await getDownloadURL(storageRef);
                        const response = await updateProfileImgApi(url);
                        queryClient.invalidateQueries(["userInfoQuery"]); // 쿼리가 만료되면 다시 알아서 들고옴
                        alert("아! 아! await~!");
                    }
                );
            }
            
        }
    }
    
    const handleDefaultImgChangeOnClick = async () => {
        if(window.confirm("기본이미지로 변경하시겠습니까?")) {
            await updateProfileImgApi("");
            queryClient.invalidateQueries(["userInfoQuery"]);
            alert("아! 아! await~!");
        }
    }

    return (
        <div css={layout}>
            <h1>프로필</h1>
            <div css={imgBox} onClick={handleImageChangeOnClick}>
                <img src={userInfoState.data?.data.img} alt="" />
            </div>
            <div css={progressBox}>
                <Progress percent={uploadPercent} status={uploadPercent !== 100 ? "active" : "success"}/>
            </div>
            <div>
                <button onClick={handleDefaultImgChangeOnClick}>기본 이미지로 변경</button>
            </div>
        </div>
    );
}

export default UserProfilePage;
