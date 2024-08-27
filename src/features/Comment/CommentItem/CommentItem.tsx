import { Link } from "react-router-dom";
import { useCallback, useState } from "react";

import classes from "./CommentItem.module.scss";

import AddReply from "@/assets/reply-write.svg";

import { CommentItem as CommentItemType } from "@/types/comment";

import EditorViewer from "@/components/EditorViewer/EditorViewer";
import CommentForm from "@/components/CommentForm/CommentForm";
import Dialog from "@/components/Dialog/Dialog";

import useUser from "@/hooks/useUser";

import { getTimeAgo } from "@/utils/number";

type CommentItemProps = {
  comment: CommentItemType;
  boardId: number;
  isChild?: boolean;
};

const CommentItem = ({ comment, boardId, isChild = false }: CommentItemProps) => {
  const { user } = useUser();

  const [isWriteChild, setIsWriteChild] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleWriteChild = useCallback(() => {
    setIsWriteChild((prev) => !prev);
  }, []);

  const handleSubmitChildComment = useCallback(
    (content: string) => {
      console.log("대댓글 작성 : ", comment.commentId, content);
      setIsWriteChild(false);
    },
    [comment.commentId],
  );

  const handleUpdate = useCallback(() => {
    console.log(boardId);
    console.log("수정");
  }, [boardId]);

  const handleDelete = useCallback(() => {
    console.log("삭제 : ", comment.commentId, boardId);
    setIsOpen(false);
  }, [boardId, comment.commentId]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <Dialog isOpen={isOpen} title="댓글을 삭제하시겠습니까?" onDelete={handleDelete} onCancel={handleCancel}>
        <p>한 번 삭제된 댓글은 복구할 수 없습니다.</p>
        <p>삭제하시겠습니까?</p>
      </Dialog>
      <div className={classes.item}>
        <div className={classes.top}>
          <Link className={classes.user} to={`/account/${comment.commentId}`}>
            <img src={comment.uploader.profilePath} alt="프로필 이미지 아이콘" />
            <p className={classes.nickname}>{comment.uploader.nickname}</p>
          </Link>
          <div className={classes.funcBox}>
            <p className={classes.createdTime}>{getTimeAgo(comment.createdTime)}</p>
            {user?.userId === comment.uploader.userId && (
              <>
                <button className={`${classes.btn} ${classes.update}`} onClick={handleUpdate}>
                  수정
                </button>
                <button className={`${classes.btn} ${classes.delete}`} onClick={handleOpen}>
                  삭제
                </button>
              </>
            )}
          </div>
        </div>
        <EditorViewer className={classes.content} content={comment.content} />
        {!isChild && user && (
          <button className={classes.writeBtn} onClick={handleWriteChild}>
            <img src={AddReply} alt="댓글 아이콘" />
            <span className={classes.write}>{isWriteChild ? "댓글 취소" : "댓글 쓰기"}</span>
          </button>
        )}
        {isWriteChild && user && (
          <div className={classes.child}>
            <div className={classes.form}>
              <div className={classes.user}>
                <img src={user.profilePath} alt="프로필 이미지 아이콘" />
                <p className={classes.nickname}>{user.nickname}</p>
              </div>
              <CommentForm onSubmit={handleSubmitChildComment} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentItem;
