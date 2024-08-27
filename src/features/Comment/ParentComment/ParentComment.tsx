import { useParams } from "react-router-dom";
import { Fragment, useMemo, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { ParentCommentList } from "@/types/comment";

import { CommentApi } from "@/api/comment";

import CommentItem from "../CommentItem/CommentItem";
import ChildComment from "../ChildComment/ChildComment";

import useInfinityScroll from "@/hooks/useInfinityScroll";

import { getNextPagination } from "@/utils/pagination";

const count = 10;

const ParentComment = () => {
  const params = useParams<{ boardId: string }>();
  const boardId: number = useMemo(() => {
    return params.boardId ? +params.boardId : 0;
  }, [params]);

  const endRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<ParentCommentList>({
    queryKey: ["parentComments", boardId],
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
      return await CommentApi.fetchParentComments(boardId, page as number, count);
    },
  });

  useInfinityScroll(endRef, () => {
    if (isLoading || isFetching || !hasNextPage) return;
    fetchNextPage();
  });

  return (
    <>
      {data?.pages.map((comment) => {
        return comment.comments.map((item) => (
          <Fragment key={item.commentId}>
            <CommentItem comment={item} boardId={boardId} />
            {item.hasReply && <ChildComment commentId={item.commentId} />}
          </Fragment>
        ));
      })}
      <div ref={endRef}></div>
    </>
  );
};

export default ParentComment;
