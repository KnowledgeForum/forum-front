import { ChildCommentList, ParentCommentList } from "@/types/comment";

export const CommentApi = {
  fetchParentComments: async (boardId: number, page: number, count: number): Promise<ParentCommentList> => {
    console.log("Fetch parent comments : ", boardId, page, count);

    return {
      comments: [
        {
          commentId: 1,
          content: "comment1",
          uploader: {
            userId: 1,
            nickname: "user1",
            profilePath: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          },
          hasReply: true,
          createdTime: "2024-08-24 14:23:00",
        },
        {
          commentId: 2,
          content: "comment2",
          uploader: {
            userId: 2,
            nickname: "user2",
            profilePath: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          },
          hasReply: true,
          createdTime: "2024-08-14 14:23:00",
        },
        {
          commentId: 3,
          content: "comment3",
          uploader: {
            userId: 3,
            nickname: "user3",
            profilePath: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          },
          hasReply: false,
          createdTime: "2024-08-01 14:23:00",
        },
        {
          commentId: 4,
          content: "comment4",
          uploader: {
            userId: 4,
            nickname: "user4",
            profilePath: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          },
          hasReply: false,
          createdTime: "2023-07-01 14:23:00",
        },
        {
          commentId: 5,
          content: "comment5",
          uploader: {
            userId: 5,
            nickname: "user5",
            profilePath: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          },
          hasReply: false,
          createdTime: "2021-06-01 14:23:00",
        },
      ],
      total: 16,
    };
  },
  fetchChildComments: async (
    boardId: number,
    commentId: number,
    page: number,
    count: number,
  ): Promise<ChildCommentList> => {
    console.log("Fetch child comments : ", boardId, commentId, page, count);

    return {
      comments: [
        {
          commentId: 11,
          content: "child comment1",
          uploader: {
            userId: 1,
            nickname: "user1",
            profilePath: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          },
          createdTime: "2024-08-27 14:23:00",
        },
        {
          commentId: 12,
          content: "child comment2",
          uploader: {
            userId: 2,
            nickname: "user2",
            profilePath: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          },
          createdTime: "2024-08-14 14:23:00",
        },
      ],
      total: 16,
    };
  },
};
