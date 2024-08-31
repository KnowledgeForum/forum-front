import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";

import classes from "./BoardDetail.module.scss";

import BackIcon from "@/assets/back.svg";
import ViewIcon from "@/assets/view.svg";
import CommentIcon from "@/assets/comment.svg";

import { Board } from "@/types/board";

import { BoardApi } from "@/api/board";

import LikeButton from "@/features/LikeButton/LikeButton";
import Comment from "@/features/Comment/Comment";

import EditorViewer from "@/components/EditorViewer/EditorViewer";
import Tag from "@/components/Tag/Tag";
import SkeletonBoardDetail from "@/components/Skeleton/BoardDetail/SkeletonBoardDetail";

import useUser from "@/hooks/useUser";

import { convertToUnit, getTimeAgo } from "@/utils/number";

const BoardDetail = () => {
  const { user } = useUser();
  const params = useParams<{ boardId: string }>();
  const boardId: number = useMemo(() => {
    return params.boardId ? +params.boardId : 0;
  }, [params]);

  const [board, setBoard] = useState<Board | null>(null);

  const fetchBoardDetail = useCallback(async () => {
    try {
      await setTimeout(async () => {
        const response = await BoardApi.fetchBoardDetail(boardId);
        setBoard(response);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }, [boardId]);

  useEffect(() => {
    fetchBoardDetail();
  }, [fetchBoardDetail]);

  return (
    <>
      {board ? (
        <>
          <div className={classes.detail}>
            <div className={classes.top}>
              <div className={classes.left}>
                <Link to={-1 as never} replace>
                  <div className={classes.backBox}>
                    <img src={BackIcon} alt="뒤로가기 아이콘" width={25} height={25} />
                  </div>
                </Link>
                <Link to={`/account/${board.uploader.userId}`}>
                  <div className={classes.user}>
                    <div className={classes.profileBox}>
                      <img src={board?.uploader.profilePath} alt="사용자 프로필 사진" />
                    </div>
                    <div className={classes.info}>
                      <p className={classes.nickname}>{board?.uploader.nickname}</p>
                      <p className={classes.date}>{getTimeAgo(board?.createdTime)}</p>
                    </div>
                  </div>
                </Link>
              </div>
              {user?.userId === board.uploader.userId && (
                <div className={classes.btnBox}>
                  <button className={classes.update}>글 수정</button>
                  <button className={classes.delete}>글 삭제</button>
                </div>
              )}
            </div>
            <div className={classes.title}>{board.title}</div>
            <EditorViewer content={board.content} className={classes.content} />
            <div className={classes.bottom}>
              <div className={classes.btn}>
                <img src={ViewIcon} alt="조회수 아이콘" />
                {convertToUnit(board.viewCount)}
              </div>
              <a href="#comment" className={classes.btn}>
                <img src={CommentIcon} alt="댓글 아이콘" />
                {convertToUnit(board.commentCount)}
              </a>
              <LikeButton boardId={board.boardId} isLikeProp={board.isLike} />
            </div>
          </div>
          <Tag tags={board.tags} />
          <hr className={classes.hr} />
          <Comment boardId={board.boardId} />
        </>
      ) : (
        <SkeletonBoardDetail />
      )}
    </>
  );
};

export default BoardDetail;
