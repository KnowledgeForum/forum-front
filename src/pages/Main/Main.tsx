import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Skeleton } from "@mui/material";

import { BoardListWithType, BoardWithType } from "@/types/board";

import Bitcoin from "@/assets/bitcoin.png";

import BoardItem from "@/components/BoardItem/BoardItem";

import useInfinityScroll from "@/hooks/useInfinityScroll";

const Main = () => {
  const count = 5;

  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recentBoards, setRecentBoards] = useState<BoardWithType[] | null>(null);

  const endRef = useRef<HTMLDivElement>(null);

  const fetchRecentBoards = useCallback(async () => {
    // TODO: 최근 뉴스 또는 게시글 목록을 불러오는 API 호출
    const recentBoards: BoardListWithType = {
      boards: [
        {
          boardId: 1,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "비트코인을 사용한 프로젝트 구성",
          tags: [
            { tagId: 1, tagName: "finace" },
            { tagId: 2, tagName: "bitcoin" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-08-17 12:30:45",
        },
        {
          boardId: 2,
          boardType: "B",
          thumbnail: Bitcoin,
          title:
            "4단계를 통해 SEO 최적화 방법을 설명합니다.  SEO를 통해 어떻게 트래픽을 관리하고 어떤 방법을 사용하는 것이 가장 좋은 방법",
          tags: [
            { tagId: 3, tagName: "seo" },
            { tagId: 4, tagName: "blogging" },
            { tagId: 5, tagName: "traffic" },
          ],
          isLike: true,
          uploader: { userId: 3, nickname: "User_03", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-08-17 09:38:24",
        },
        {
          boardId: 3,
          boardType: "B",
          thumbnail: Bitcoin,
          title: "OnePay - 온라인 결제 처리 웹앱을 소개합니다. - xxx.com에서 다운로드",
          tags: [
            { tagId: 11, tagName: "onepay" },
            { tagId: 12, tagName: "online" },
            { tagId: 13, tagName: "webapp" },
          ],
          isLike: true,
          uploader: { userId: 4, nickname: "User_04", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 5,
          likeCount: 1,
          commentCount: 3,
          createdTime: "2024-06-17 12:30:45",
        },
        {
          boardId: 4,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "사용자 인터페이스 설계 - 단 몇 달만에 1800개의 공유를 기록한 방법",
          tags: [
            { tagId: 14, tagName: "design" },
            { tagId: 15, tagName: "user interface" },
            { tagId: 16, tagName: "designing" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-02-17 12:30:45",
        },
        {
          boardId: 5,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "사용자 인터페이스 설계 - 단 몇 달만에 1개의 공유를 기록한 방법",
          tags: [
            { tagId: 14, tagName: "design" },
            { tagId: 15, tagName: "user interface" },
            { tagId: 16, tagName: "designing" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2022-01-17 12:30:45",
        },
      ],
      total: 5,
    };

    setRecentBoards(recentBoards.boards);
    setTotal(recentBoards.total);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchRecentBoards();
  }, [fetchRecentBoards]);

  useInfinityScroll(endRef, () => {
    if (isLoading) return;
    if (recentBoards && recentBoards.length >= total) return;

    // TODO: 최근 뉴스 또는 게시글 목록을 불러오는 API 호출
    console.log("infinity scroll");
  });

  return (
    <>
      {!isLoading ? (
        <>
          {recentBoards &&
            total > 0 &&
            recentBoards.map((board) => <BoardItem key={board.boardId} board={board} to={`/board/${board.boardId}`} />)}
        </>
      ) : (
        <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={"1.25rem"}>
          {Array(count)
            .fill(0)
            .map((_, index) => (
              <Box
                key={index}
                display={"flex"}
                gap={"1.25rem"}
                padding={"1.25rem"}
                borderRadius={"16px"}
                bgcolor={"#262d34"}
              >
                <Skeleton variant="rectangular" width={156} height={156} />
                <Box width={"100%"}>
                  <Skeleton variant="text" width={"100%"} height={60} />
                  <Skeleton variant="text" width={"100%"} height={30} />
                  <Skeleton variant="text" width={"100%"} height={30} />
                </Box>
              </Box>
            ))}
        </Box>
      )}
      <div ref={endRef} />
    </>
  );
};

export default Main;
