import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { Link, useNavigate } from 'react-router-dom';
import { signinApi } from '../../apis/signinApi';
import { instance } from '../../apis/util/instance';

function UserLoginPage(props) {
    const navigate = useNavigate();

    const [ fieldErrorMessages, setFieldErrorMessages ] = useState({
        username: <></>,
        password: <></>
    });

    const [ inputUser, setInputUser ] = useState({
        username: "",
        password: ""
    })

    const handleInputUserOnChange = (e) => {
        setInputUser(user => ({
            ...user,
            [e.target.name]: e.target.value
        }))
    }

    const handleLoginSubmitOnClick = async () => {
        const signinData = await signinApi(inputUser);
        if(!signinData.isSuccess) {
            if(signinData.errorStatus === 'fieldError') {
                showFieldErrorMessage(signinData.error);
            }
            if(signinData.errorStatus === 'loginError') {
                let EmptyFieldErrors = {
                    username: <></>,
                    password: <></>
                }
                setFieldErrorMessages(EmptyFieldErrors);
                alert(signinData.error);
            }
            return;
        }

        localStorage.setItem("accessToken", "Bearer " + signinData.token.accessToken);

        instance.interceptors.request.use(config => {
            config.headers["Authorization"] = localStorage.getItem("accessToken");
            return config
        });

        console.log(window.history.length);

        if(window.history.length > 2) {
            alert("아! 아! await~!");
            navigate(-1);
            return;
        }
        
        navigate("/");
    }

    const showFieldErrorMessage = (fieldErrors) => {
        let EmptyFieldErrors = {
            username: <></>,
            password: <></>,
        };
        
        for(let fieldError of fieldErrors) {
            EmptyFieldErrors = {
                ...EmptyFieldErrors,
                [fieldError.field]: <p>{fieldError.defaultMessage}</p>
            }

        }

        setFieldErrorMessages(EmptyFieldErrors);
    }

    return (
        <div>
            <div css={s.layout}>
            <Link to={"/"} ><h1 css={s.logo}>LOGO</h1></Link>
            <div css={s.loginInfoBox}>
                <div>
                    <input type="text" name='username' onChange={handleInputUserOnChange} value={inputUser.username} placeholder='ID' />
                    {
                        fieldErrorMessages.username
                    }
                </div>
                <div>
                    <input type="password" name='password' onChange={handleInputUserOnChange} value={inputUser.password} placeholder='Password'/>
                    {
                        fieldErrorMessages.password
                    }
                </div>
            </div>
            <button css={s.loginButton} onClick={handleLoginSubmitOnClick}>Login</button>
            <a href='http://localhost:8080/oauth2/authorization/google'>구글로그인</a>
            <a href='http://localhost:8080/oauth2/authorization/naver'>네이버로그인</a>
            <a href='http://localhost:8080/oauth2/authorization/kakao'>카카오로그인</a>
        </div>
        </div>
    );
}

export default UserLoginPage;