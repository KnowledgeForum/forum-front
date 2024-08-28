import { useCallback } from "react";

import classes from "./comment.module.scss";

import CommentForm from "@/components/CommentForm/CommentForm";
import ParentComment from "./ParentComment/ParentComment";

type CommentProps = {
  boardId: number;
};

const Comment = ({ boardId }: CommentProps) => {
  const handleSubmit = useCallback(
    (content: string) => {
      console.log("comment submit : ", content, boardId);
    },
    [boardId],
  );

  return (
    <div className={classes.comment} id="comment">
      <CommentForm onSubmit={handleSubmit} />
      <ParentComment />
    </div>
  );
};

export default Comment;
