import { Tag } from "./tag";
import { Uploader } from "./user";

export type BoardType = "B" | "N";

export type Board = {
  boardId: number;
  boardType: BoardType;
  uploader: Uploader;
  title: string;
  content: string;
  tags: Tag[];
  isLike: boolean;
  likeCount: number;
  viewCount: number;
  commentCount: number;
  createdTime: string;
};

export type BoardItem = Pick<
  Board,
  "boardId" | "title" | "tags" | "isLike" | "uploader" | "commentCount" | "likeCount" | "viewCount" | "createdTime"
> & { thumbnail: string };

export type BoardWithType = BoardItem & { boardType: BoardType };

export type BoardItemList = {
  boards: BoardItem[];
  total: number;
};

export type BoardListWithType = {
  boards: BoardWithType[];
  total: number;
};

export type IntroBoard = Pick<BoardItem, "boardId" | "thumbnail" | "title"> & {
  nickname: string;
};

export type IntroBoardList = {
  boards: IntroBoard[];
};
