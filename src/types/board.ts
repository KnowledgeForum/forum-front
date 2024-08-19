import { Tag } from "./tag";
import { Uploader } from "./user";

export type Board = {
  boardId: number;
  thumbnail: string;
  title: string;
  tags: Tag[];
  isLike: boolean;
  uploader: Uploader;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdTime: string;
};

export type BoardType = "B" | "N";

export type BoardWithType = Board & { boardType: BoardType };

export type BoardList = {
  boards: Board[];
  total: number;
};

export type BoardListWithType = {
  boards: BoardWithType[];
  total: number;
};

export type IntroBoard = Pick<Board, "boardId" | "thumbnail" | "title"> & {
  nickname: string;
};

export type IntroBoardList = {
  boards: IntroBoard[];
};
