import { MouseEvent, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BoardWithType } from "@/types/board";

import classes from "./BoardItem.module.scss";

import BoardIcon from "@/assets/type-board.svg";
import NewsIcon from "@/assets/type-news.svg";

import { getIncludeComma, getTimeAgo } from "@/utils/number";

import Tag from "../Tag/Tag";
import LikeButton from "@/features/LikeButton/LikeButton";

type BoardItemProps = {
  board: BoardWithType;
  to: string;
};

const BoardItem = ({ board, to }: BoardItemProps) => {
  const navigate = useNavigate();

  const moveUser = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      event.preventDefault();
      navigate(`/user/${board.uploader.userId}`);
    },
    [navigate, board.uploader.userId],
  );

  return (
    <Link to={to} className={classes.item}>
      <img src={board.thumbnail} alt="게시글 썸네일" className={classes.thumbnail} />
      <div className={classes.container}>
        <div className={classes.top}>
          <span className={classes.title}>{board.title}</span>
          <div className={classes.right}>
            <div className={classes.type}>
              {board.boardType === "N" ? (
                <img src={NewsIcon} alt="뉴스 아이콘" width={20} height={20} />
              ) : (
                <img src={BoardIcon} alt="게시글 아이콘" width={20} height={20} />
              )}
            </div>
            <LikeButton boardId={board.boardId} isLikeProp={board.isLike} />
          </div>
        </div>
        <Tag tags={board.tags} />
        <div className={classes.user}>
          <div className={classes.left} onClick={moveUser}>
            <img src={board.uploader.profilePath} alt="사용자 프로필 사진" className={classes.profileImg} />
            <div className={classes.etc}>
              <p className={classes.nickname}>{board.uploader.nickname}</p>
              <p className={`${classes.gray} ${classes.createdTime}`}>{getTimeAgo(board.createdTime)}</p>
            </div>
          </div>
          <div className={classes.right}>
            <span className={`${classes.gray} ${classes.count}`}>{getIncludeComma(board.viewCount)} Views</span>
            <span className={`${classes.gray} ${classes.count}`}>{getIncludeComma(board.likeCount)} Likes</span>
            <span className={`${classes.gray} ${classes.count}`}>{getIncludeComma(board.commentCount)} Comments</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BoardItem;
