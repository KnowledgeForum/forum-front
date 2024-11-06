import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { useMemo } from "react";

import { TagPopular } from "@/types/tag";
import { IntroBoardList } from "@/types/board";

import { BoardApi } from "@/api/board";
import { TagApi } from "@/api/tag";
import { NotificationApi } from "@/api/notification";

import useWindowSize from "@/hooks/useWindowSize";

import DesktopHeader from "@/components/Header/DesktopHeader/DesktopHeader";
import MobileHeader from "@/components/Header/MobileHeader/MobileHeader";
import NewsNavigation from "@/components/SubNavigation/NewsNavigation/NewsNavigation";
import TagNavigation from "@/components/SubNavigation/TagNavigation/TagNavigation";
import BoardNavigation from "@/components/SubNavigation/BoardNavigation/BoardNavigation";

import classes from "./MainLayout.module.scss";

const MainLayout = () => {
  const tabeltSize = 992;

  const { width } = useWindowSize();

  const { data: unReadCount } = useQuery<number>({
    queryKey: ["unReadCount"],
    queryFn: NotificationApi.getUnReadCount,
  });
  const { data: recommendBoards, isLoading: isLoadingRecommendBoards } = useQuery<IntroBoardList>({
    queryKey: ["recommendBoards"],
    queryFn: BoardApi.fetchRecommendBoards,
  });
  const { data: popularBoards, isLoading: isLoadingPopularBoards } = useQuery<IntroBoardList>({
    queryKey: ["popularBoards"],
    queryFn: BoardApi.fetchPopularBoards,
  });
  const { data: tags, isLoading: isLoadingTags } = useQuery<TagPopular>({
    queryKey: ["popularTags"],
    queryFn: TagApi.fetchPopularTags,
  });

  const header = useMemo(() => {
    return width > tabeltSize ? <DesktopHeader /> : <MobileHeader />;
  }, [width, tabeltSize]);

  return (
    <>
      {header}
      <div className={classes.layout}>
        <div className={classes.left}>
          <NewsNavigation unReadCount={unReadCount} />
          <TagNavigation tags={tags} isLoading={isLoadingTags} />
        </div>
        <main className={classes.main}>
          <Outlet />
        </main>
        <div className={classes.right}>
          <BoardNavigation title="추천 뉴스" boards={recommendBoards?.boards} isLoading={isLoadingRecommendBoards} />
          <BoardNavigation title="인기 게시글" boards={popularBoards?.boards} isLoading={isLoadingPopularBoards} />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
