import { BoardApi } from "@/api/board";

import InfinityScrollBoard from "@/features/InfinityScrollBoard/InfinityScrollBoard";

const Follow = () => {
  const count = 5;

  return (
    <InfinityScrollBoard
      queryKey={["recentBoards", count]}
      fetchFunction={BoardApi.fetchRecentFollowingBoards}
      count={count}
    />
  );
};

export default Follow;
