import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { TagPopular } from "@/types/tag";

import Desktopheader from "@/components/Header/DesktopHeader/DesktopHeader";
import Mobileheader from "@/components/Header/MobileHeader/MobileHeader";
import NewsNavigation from "@/components/SubNavigation/NewsNavigation/NewsNavigation";
import TagNavigation from "@/components/SubNavigation/TagNavigation/TagNavigation";
import BoardNavigation from "@/components/SubNavigation/BoardNavigation/BoardNavigation";

import classes from "./MainLayout.module.scss";

import useWindowSize from "@/hooks/useWindowSize";
import useUser from "@/hooks/useUser";
import { IntroBoardList } from "@/types/board";

const MainLayout = () => {
  const tabeltSize = 992;

  const { width } = useWindowSize();
  const { user } = useUser();

  const [unReadCount, setUnReadCount] = useState<number>(0);
  const [tags, setTags] = useState<TagPopular[]>([]);
  const [recommendBoards, setRecommendBoards] = useState<IntroBoardList | null>();
  const [popularBoards, setPopularBoards] = useState<IntroBoardList | null>();

  useEffect(() => {
    // TODO: 추천 게시글 목록을 가져오는 API 호출
    setRecommendBoards({
      boards: [
        {
          boardId: 1,
          thumbnail: "https://via.placeholder.com/150",
          title: "비극 속에서 한 사업을 매각하고 다른 사업을 확장하기",
          nickname: "User_01",
        },
        {
          boardId: 2,
          thumbnail: "https://via.placeholder.com/150",
          title: "창업자로서의 정신 건강과 커뮤니티의 중요성 및 컨디션 관리를 어떻게 하는 게 좋을까?",
          nickname: "User_02",
        },
        {
          boardId: 3,
          thumbnail: "https://via.placeholder.com/150",
          title: "1년 만에 비트코인으로 월 수익 $8,500",
          nickname: "User_03",
        },
        {
          boardId: 4,
          thumbnail: "https://via.placeholder.com/150",
          title: "2024년 정신 건강과 부트스트래핑을 통한 창업",
          nickname: "User_04",
        },
        {
          boardId: 5,
          thumbnail: "https://via.placeholder.com/150",
          title: "백엔드 개발자로 살아가는 방법",
          nickname: "User_05",
        },
        {
          boardId: 6,
          thumbnail: "https://via.placeholder.com/150",
          title: "커뮤니티를 잘 사용하는 사람과 못 사용하는 사람의 차이점",
          nickname: "User_06",
        },
      ],
    });
  }, []);

  useEffect(() => {
    // TODO: 인기 게시글 목록을 가져오는 API 호출
    setPopularBoards({
      boards: [
        {
          boardId: 1,
          thumbnail: "https://via.placeholder.com/150",
          title: "비극 속에서 한 사업을 매각하고 다른 사업을 확장하기",
          nickname: "User_01",
        },
        {
          boardId: 2,
          thumbnail: "https://via.placeholder.com/150",
          title: "창업자로서의 정신 건강과 커뮤니티의 중요성 및 컨디션 관리를 어떻게 하는 게 좋을까?",
          nickname: "User_02",
        },
        {
          boardId: 3,
          thumbnail: "https://via.placeholder.com/150",
          title: "1년 만에 비트코인으로 월 수익 $8,500",
          nickname: "User_03",
        },
        {
          boardId: 4,
          thumbnail: "https://via.placeholder.com/150",
          title: "2024년 정신 건강과 부트스트래핑을 통한 창업",
          nickname: "User_04",
        },
        {
          boardId: 5,
          thumbnail: "https://via.placeholder.com/150",
          title: "백엔드 개발자로 살아가는 방법",
          nickname: "User_05",
        },
        {
          boardId: 6,
          thumbnail: "https://via.placeholder.com/150",
          title: "커뮤니티를 잘 사용하는 사람과 못 사용하는 사람의 차이점",
          nickname: "User_06",
        },
      ],
    });
  }, []);

  useEffect(() => {
    // TODO: 인기 태그 목록을 가져오는 API 호출
    const tags: TagPopular[] = [
      {
        tagId: 1,
        tagName: "javascript",
        tagCount: 10,
      },
      {
        tagId: 2,
        tagName: "bitcoin",
        tagCount: 8,
      },
      {
        tagId: 3,
        tagName: "design",
        tagCount: 6,
      },
      {
        tagId: 4,
        tagName: "innovation",
        tagCount: 5,
      },
      {
        tagId: 5,
        tagName: "tutorial",
        tagCount: 3,
      },
      {
        tagId: 6,
        tagName: "test",
        tagCount: 1,
      },
    ];

    setTags(tags);
  }, []);

  useEffect(() => {
    // TODO: 팔로우 뉴스 알림 개수를 가져오는 API 호출
    setUnReadCount(34);
  }, []);

  return (
    <>
      {width > tabeltSize ? <Desktopheader user={user} /> : <Mobileheader user={user} />}
      <div className={classes.layout}>
        <div className={classes.left}>
          <NewsNavigation unReadCount={unReadCount} />
          <TagNavigation tags={tags} />
        </div>
        <main className={classes.main}>
          <Outlet />
        </main>
        <div className={classes.right}>
          {recommendBoards && <BoardNavigation title="추천 뉴스" boards={recommendBoards.boards} />}
          {popularBoards && <BoardNavigation title="인기 게시글" boards={popularBoards.boards} />}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
