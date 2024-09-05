import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';

function IndexPage(props) {
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const userInfoState = queryClient.getQueryState("userInfoQuery");
    const accessTokenValidState = queryClient.getQueryState("accessTokenValidQuery");
    
    console.log(accessTokenValidState);
    console.log(userInfoState);

    const habdleLoginButtonOnClick = () => {
        navigate("/user/login");
    }

    const handleLogoutButtonOnClick = () => {
        localStorage.removeItem("accessToken");
        window.location.replace("/");
    }

    return (
        <div css={s.layout}>
            <header css={s.header}>
                <input type="text" />
            </header>
            <main css={s.main}>
                <div css={s.leftBox}>
                    <Link to={"/board"}>게시글</Link>
                    <Link to={"/board/write"}>글쓰기</Link>
                </div>
                {
                    accessTokenValidState.status !== "success"
                    ?
                        accessTokenValidState.status !== "error"
                        ?
                        <></>
                        :
                        <div css={s.rightBox}>
                            <p>더 안전하고 편리하게 이용하세요</p>
                            <button onClick={habdleLoginButtonOnClick}>로그인</button>
                            <div>
                                <Link to={"/user/help/id"}>아이디 찾기</Link>
                                <Link to={"/user/help/password"}>비밀번호 찾기</Link>
                                <Link to={"/user/join"}>회원가입 찾기</Link>
                            </div>
                        </div>
                    :
                    <div css={s.rightBox}>
                        <div css={s.userInfoBox}>
                            <div css={s.profileImgBox} onClick={() => navigate("/profile")}>
                                <img src={userInfoState.data?.data.img} alt="" />
                            </div>
                            <div css={s.profileInfo}>
                                <div>
                                    <div>{userInfoState.data?.data.name} "아! 아! await~!"</div>
                                    <div>{userInfoState.data?.data.email}</div>
                                </div>
                                <button onClick={handleLogoutButtonOnClick}>로그아웃</button>
                            </div>
                        </div>
                    </div>
                }
            </main>
        </div>
    );
}

export default IndexPage;