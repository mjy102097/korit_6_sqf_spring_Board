import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { Link, useNavigate } from 'react-router-dom';
import { signupApi } from '../../apis/signupApi';

function UserJoinPage(props) {
    const nav = useNavigate();

    const [ fieldErrorMessages, setFieldErrorMessages ] = useState({
        username: <></>,
        password: <></>,
        checkPassword: <></>,
        name: <></>,
        email: <></>
    });
    
    const [ inputUser, setInputUser ] = useState({
        username: "",
        password: "",
        checkPassword: "",
        name: "",
        email: ""
    })

    const handleInputUserOnChange = (e) => {
        setInputUser(user => ({
            ...user,
            [e.target.name]: e.target.value
        }))
    }
   
    const handleJoinSubmitOnClick = async () => {
        const signupData = await signupApi(inputUser);
        if(!signupData.isSuccess) {
            showFieldErrorMessage(signupData.fieldErrors);
            return;
        }
        alert(`${signupData.ok.message}`);
        nav("/user/login");
    }

    const showFieldErrorMessage = (fieldErrors) => {
        let EmptyFieldErros = {
            username: <></>,
            password: <></>,
            checkPassword: <></>,
            name: <></>,
            email: <></>
        };
        
        for(let fieldError of fieldErrors) {
            EmptyFieldErros = {
                ...EmptyFieldErros,
                [fieldError.field]: <p>{fieldError.defaultMessage}</p>
            }
        }

        setFieldErrorMessages(EmptyFieldErros);
    }


    return (
        <div css={s.layout}>
            <Link to={"/"}><h1 css={s.logo}>LOGO</h1></Link>
            <div css={s.joinInfoBox}>
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
                <div>
                    <input type="password" name='checkPassword' onChange={handleInputUserOnChange} value={inputUser.checkPassword} placeholder='CheckPassword'/>
                    {
                        fieldErrorMessages.checkPassword
                    }
                </div>
                <div>
                    <input type="text" name='name' onChange={handleInputUserOnChange} value={inputUser.name} placeholder='Name'/>
                    {
                        fieldErrorMessages.name
                    }
                </div>
                <div>
                    <input type="email" name='email' onChange={handleInputUserOnChange} value={inputUser.email} placeholder='Email'/>
                    {
                        fieldErrorMessages.email
                    }
                </div>
            </div>
            <button css={s.joinButton} onClick={handleJoinSubmitOnClick}>JOIN</button>
        </div>
    );
}

export default UserJoinPage;