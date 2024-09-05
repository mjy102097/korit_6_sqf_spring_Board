/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { oauth2JoinApi, oauth2MergeApi } from "../../apis/oauth2Api";

function OAuth2JoinPage(props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [selectMenu, setSelectMenu] = useState("merge");

    const [inputUser, setInputUser] = useState({
        username: "",
        password: "",
        checkPassword: "",
        name: "",
        email: ""
    });

    const [fieldErrorMessages, setFieldErrorMessages] = useState({
        username: <></>,
        password: <></>,
        checkPassword: <></>,
        name: <></>,
        email: <></>
    });

    const handleSelectMenuOnChange = (e) => {
        setInputUser({
            username: "",
            password: "",
            checkPassword: "",
            name: "",
            email: ""
        })
        setFieldErrorMessages({
            username: <></>,
            password: <></>,
            checkPassword: <></>,
            name: <></>,
            email: <></>
        })
        setSelectMenu(e.target.value);
    }

    const handleInputUserOnChange = (e) => {
        setInputUser(user => ({
            ...user,
            [e.target.name]: e.target.value
        }))
    }
    
    const handleMergeSubmitOnClick = async () => {
        const mergeUser = {
            username: inputUser.username,
            password: inputUser.password,
            oauth2Name: searchParams.get("oAuth2Name"),
            provider: searchParams.get("provider"),
        }
        const mergeData = await oauth2MergeApi(mergeUser);
        if(!mergeData.isSuccess) {
            if(mergeData.fieldErrors === "loginError") {
                alert(mergeData.error);
                return;
            }
            if(mergeData.errorStatus === "fieldError") {
                showFieldErrorMessage(mergeData.error);
                return;
            }
        }
        alert("계정 통합이 완료되었습니다.");
        navigate("/user/login");
    }
    
    const handleJoinSubmitOnClick = async () => {
        const joinUser = {
            ...inputUser,
            oauth2Name: searchParams.get("oAuth2Name"),
            provider: searchParams.get("provider")
        }
        const joinData = await oauth2JoinApi(joinUser);
        if(!joinData.isSuccess) {
            showFieldErrorMessage(joinData.fieldErrors);
            return;
        }
        alert("회원가입이 완료 AA await!!");
        navigate("/");
    }

    const showFieldErrorMessage = (fieldErrors) => {
        let EmptyFieldErros = {
            username: <></>,
            password: <></>,
            checkPassword: <></>,
            name: <></>,
            email: <></>
        };

        for (let fieldError of fieldErrors) {
            EmptyFieldErros = {
                ...EmptyFieldErros,
                [fieldError.field]: <p>{fieldError.defaultMessage}</p>
            }
        }

        setFieldErrorMessages(EmptyFieldErros);
    }

    return (
        <div css={s.layout}>
            <Link to={"/"}><h1 css={s.logo}>사이트 로고</h1></Link>
            <div css={s.selectMenuBox}>
                <input type="radio" id="merge" name="selectMenu"
                    onChange={handleSelectMenuOnChange}
                    checked={selectMenu === "merge"} value="merge" />
                <label htmlFor="merge">계정통합</label>
                <input type="radio" id="join" name="selectMenu"
                    onChange={handleSelectMenuOnChange}
                    checked={selectMenu === "join"} value="join" />
                <label htmlFor="join">회원가입</label>
            </div>
            {
                selectMenu === "merge"
                    ?
                    <>
                        <div css={s.joinInfoBox}>
                            <div>
                                <input type="text" name='username' onChange={handleInputUserOnChange} value={inputUser.username} placeholder='아이디' />
                                {fieldErrorMessages.username}
                            </div>
                            <div>
                                <input type="password" name='password' onChange={handleInputUserOnChange} value={inputUser.password} placeholder='비밀번호' />
                                {fieldErrorMessages.password}
                            </div>
                        </div>
                        <button css={s.joinButton} onClick={handleMergeSubmitOnClick}>통합하기</button>
                    </>
                    :
                    <>
                        <div css={s.joinInfoBox}>
                            <div>
                                <input type="text" name='username' onChange={handleInputUserOnChange} value={inputUser.username} placeholder='아이디' />
                                {
                                    fieldErrorMessages.username
                                }
                            </div>
                            <div>
                                <input type="password" name='password' onChange={handleInputUserOnChange} value={inputUser.password} placeholder='비밀번호' />
                                {
                                    fieldErrorMessages.password
                                }
                            </div>
                            <div>
                                <input type="password" name='checkPassword' onChange={handleInputUserOnChange} value={inputUser.checkPassword} placeholder='비밀번호 확인' />
                                {
                                    fieldErrorMessages.checkPassword
                                }
                            </div>
                            <div>
                                <input type="text" name='name' onChange={handleInputUserOnChange} value={inputUser.name} placeholder='성명' />
                                {
                                    fieldErrorMessages.name
                                }
                            </div>
                            <div>
                                <input type="email" name='email' onChange={handleInputUserOnChange} value={inputUser.email} placeholder='이메일' />
                                {
                                    fieldErrorMessages.email
                                }
                            </div>
                        </div>
                        <button css={s.joinButton} onClick={handleJoinSubmitOnClick}>가입하기</button>
                    </>
            }
        </div>
    );
}

export default OAuth2JoinPage;