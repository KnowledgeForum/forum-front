import { BoardApi } from "@/api/board";

import InfinityScrollBoard from "@/features/InfinityScrollBoard/InfinityScrollBoard";

const News = () => {
  const count = 5;

  return (
    <InfinityScrollBoard queryKey={["recentBoards", count]} fetchFunction={BoardApi.fetchRecentNews} count={count} />
  );
};

export default News;
