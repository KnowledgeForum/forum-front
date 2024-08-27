import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";

import classes from "./ChildComment.module.scss";

import { ChildCommentList } from "@/types/comment";

import { CommentApi } from "@/api/comment";

import CommentItem from "../CommentItem/CommentItem";

import { getNextPagination } from "@/utils/pagination";

type ChildCommentProps = {
  commentId: number;
};

const count = 10;

const ChildComment = ({ commentId }: ChildCommentProps) => {
  const params = useParams<{ boardId: string }>();
  const boardId: number = useMemo(() => {
    return params.boardId ? +params.boardId : 0;
  }, [params]);

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<ChildCommentList>({
    queryKey: ["childComments", boardId, commentId],
    initialData: undefined,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return getNextPagination({
        itemLength: allPages.length,
        count,
        total: lastPage.total,
        page: lastPageParam as number,
      });
    },
    queryFn: async ({ pageParam: page = 1 }) => {
      return await CommentApi.fetchChildComments(boardId, commentId, page as number, count);
    },
  });

  const handleNextPage = useCallback(() => {
    if (isLoading || isFetching || !hasNextPage) return;
    fetchNextPage();
  }, [hasNextPage, isFetching, isLoading, fetchNextPage]);

  return (
    <div className={classes.child}>
      {data?.pages.map((comment) => {
        return comment.comments.map((item) => (
          <div key={item.commentId} className={classes.comment}>
            <div className={classes.line} />
            <div className={classes.left}>
              <CommentItem comment={item} boardId={boardId} isChild />
            </div>
          </div>
        ));
      })}
      {hasNextPage && (
        <button className={classes.moreBtn} onClick={handleNextPage}>
          답글 더보기
        </button>
      )}
    </div>
  );
};

export default ChildComment;
