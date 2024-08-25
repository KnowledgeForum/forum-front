import { Link, useParams } from "react-router-dom";

import classes from "./BoardDetail.module.scss";

import BackIcon from "@/assets/back.svg";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Board } from "@/types/board";
import { BoardApi } from "@/api/board";
import { getTimeAgo } from "@/utils/timestamp";
import EditorViewer from "@/components/EditorViewer/EditorViewer";
import useUser from "@/hooks/useUser";

const BoardDetail = () => {
  const { user } = useUser();
  const params = useParams<{ boardId: string }>();
  const boardId: number = useMemo(() => {
    return params.boardId ? +params.boardId : 0;
  }, [params]);

  const [board, setBoard] = useState<Board | null>(null);

  const fetchBoardDetail = useCallback(async () => {
    try {
      const response = await BoardApi.fetchBoardDetail(boardId);
      setBoard(response);
    } catch (error) {
      console.error(error);
    }
  }, [boardId]);

  useEffect(() => {
    fetchBoardDetail();
  }, [fetchBoardDetail]);

  if (!board) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={classes.detail}>
      <div className={classes.top}>
        <div className={classes.left}>
          <Link to={-1 as never} replace>
            <div className={classes.backBox}>
              <img src={BackIcon} alt="뒤로가기 아이콘" width={25} height={25} />
            </div>
          </Link>
          <div className={classes.user}>
            <div className={classes.profileBox}>
              <img src={board?.uploader.profilePath} alt="사용자 프로필 사진" />
            </div>
            <div className={classes.info}>
              <p className={classes.nickname}>{board?.uploader.nickname}</p>
              <p className={classes.date}>{getTimeAgo(board?.createdTime)}</p>
            </div>
          </div>
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
    </div>
  );
};

export default BoardDetail;
