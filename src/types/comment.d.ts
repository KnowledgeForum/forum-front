import { Uploader } from "./user";

export type ParentComment = {
  commentId: number;
  uploader: Uploader;
  content: string;
  hasReply: boolean;
  createdTime: string;
};

export type ParentCommentList = {
  comments: ParentComment[];
  total: number;
};

export type ChildComment = Omit<ParentComment, "hasReply">;
export type CommentItem = ChildComment;

export type ChildCommentList = {
  comments: ChildComment[];
  total: number;
};
