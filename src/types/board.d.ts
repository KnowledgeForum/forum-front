import { Tag } from "./tag";
import { Uploader } from "./user";

export type BoardType = "B" | "N";

export type Board = {
  boardId: number;
  boardType: BoardType;
  uploader: Uploader;
  title: string;
  content: string;
  thumbnail: string | null;
  tags: Tag[];
  isLike: boolean;
  likeCount: number;
  viewCount: number;
  commentCount: number;
  createdTime: string;
};

export type UpdateBoardDetail = Omit<Board, "uploader" | "isLike" | "likeCount" | "viewCount" | "commentCount"> & {
  imageIds: number[];
};

export type DraftBoard = {
  draftId: number;
  boardType: BoardType;
  title: string | null;
  content: string | null;
  thumbnail: string | null;
  tags: Tag[] | null;
  imageIds: number[] | null;
  createdTime: string;
};

export type DraftBoardList = {
  drafts: DraftBoard[];
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

export type RequestBoard = {
  boardType: BoardType;
  title: string;
  content: string;
  tags?: Tag[];
  thumbnail?: File | string | null;
  imageIds?: number[];
};
