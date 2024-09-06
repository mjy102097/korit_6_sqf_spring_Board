/** @jsxImportSource @emotion/react */
import { Link, useNavigate, useParams } from "react-router-dom";
import * as s from "./style";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { instance } from "../../../apis/util/instance";
import { FcDislike, FcLike, FcLikePlaceholder } from "react-icons/fc";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

function DetailPage(props) {
    const navigate = useNavigate();
    const params = useParams();
    const boardId = params.boardId;
    const queryClient = useQueryClient();
    const userInfoData = queryClient.getQueryData("userInfoQuery");

    // get요청으로 params로 boardId를 보내서 title, content 및 내용들을 화면에 출력하는 query
    const board = useQuery(
        ["boardQuery", boardId],
        async () => {
            return instance.get(`/board/${boardId}`);
        },
        {
            refetchOnWindowFocus: false,
            retry: 0,
        }
    );

    const boardLike = useQuery(
        ["boardLikeQuery"],
        async () => {
            return instance.get(`/board/${boardId}/like`);
        },
        {
            refetchOnWindowFocus: false,
            retry: 0,
        }
    )

    const likeMutation = useMutation(
        async () => {
            await instance.post(`/board/${boardId}/like`)
        },
        {
            onSuccess: response => {
                boardLike.refetch();
            }
        }
    );

    const disLikeMutation = useMutation(
        async () => {
            await instance.delete(`/board/like/${boardLike.data.data.boardLikeId}`)
        },
        {
            onSuccess: response => {
                boardLike.refetch();
            }
        }
    );

    const handleLikeOnClick = () => {
        if (!userInfoData?.data) {
            if (window.confirm("로그인 후 이용가능합니다. 로그인 페이지로 이동하시겠습니까?")) {
                navigate("/user/login");
            }
            return;
        }
        likeMutation.mutateAsync();
    }

    const handleDisLikeOnClick = () => {
        disLikeMutation.mutateAsync();
    }

    return (
        <div css={s.layout}>
            <Link to={"/"}><h1>사이트 로고</h1></Link>
            {
                board.isLoading && <></>
            }
            {
                board.isError && <h1>{board.error.response.data}</h1>
            }
            {
                board.isSuccess &&
                <>
                    <div css={s.header}>
                        <div css={s.titleAndLike}>
                            <h1>{board.data.data.title}</h1>
                            <div>
                                {
                                    !boardLike?.data?.data.boardLikeId
                                        ?
                                        <button onClick={handleLikeOnClick}>
                                            <AiFillDislike />
                                        </button>
                                        :
                                        <button onClick={handleDisLikeOnClick}>
                                            <AiFillLike />
                                        </button>
                                }
                            </div>
                        </div>
                        <div css={s.boardInfocontainer}>
                            <div>
                                <span>
                                    작성자: {board.data.data.wirterUsername}
                                </span>
                                <span>
                                    조회수: {board.data.data.viewCount}
                                </span>
                                <span>
                                    따봉: {boardLike?.data?.data.likeCount}
                                </span>
                            </div>
                            <div>
                                {
                                    board.data.data.wruterId === userInfoData?.data.userId &&
                                    <>
                                        <button>수정</button>
                                        <button>삭제</button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div css={s.contentBox} dangerouslySetInnerHTML={{
                        __html: board.data.data.content
                    }}>

                    </div>
                </>
            }
        </div>
    );
}

export default DetailPage;