import { useRef } from "react";
import { Box } from "@mui/material";
import { QueryKey, useInfiniteQuery } from "@tanstack/react-query";

import { BoardListWithType, BoardWithType } from "@/types/board";

import useInfinityScroll from "@/hooks/useInfinityScroll";

import BoardItem from "@/components/BoardItem/BoardItem";
import SkeletonBoardItem from "@/components/Skeleton/BoardItem/SkeletonBoardItem";

import { getNextPagination } from "@/utils/pagination";

interface InfinityScrollBoardProps {
  count: number;
  queryKey: QueryKey;
  fetchFunction: (params: { page: number; count: number }) => Promise<BoardListWithType>;
}

const InfinityScrollBoard = ({ queryKey, fetchFunction, count }: InfinityScrollBoardProps) => {
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<BoardListWithType>({
    queryKey,
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
      return await fetchFunction({ page: page as number, count });
    },
  });

  const endRef = useRef<HTMLDivElement>(null);

  useInfinityScroll(endRef, () => {
    if (isLoading || isFetching || !hasNextPage) return;
    fetchNextPage();
  });

  return (
    <>
      {!isLoading ? (
        <>
          {data &&
            data.pages.map((pages: BoardListWithType) =>
              pages.boards.map((item: BoardWithType) => (
                <BoardItem key={item.boardId} board={item} to={`/board/${item.boardId}`} />
              )),
            )}
        </>
      ) : (
        <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={"1.25rem"}>
          {Array(count)
            .fill(0)
            .map((_, idx) => (
              <SkeletonBoardItem key={idx} />
            ))}
        </Box>
      )}
      <div ref={endRef} />
    </>
  );
};

export default InfinityScrollBoard;
