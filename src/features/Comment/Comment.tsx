import classes from "./comment.module.scss";

type CommentProps = {
  boardId: number;
};

const Comment = ({ boardId }: CommentProps) => {
  return <div className={classes.comment}>{boardId}</div>;
};

export default Comment;
