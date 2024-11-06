import { BoardApi } from "@/api/board";

import InfinityScrollBoard from "@/features/InfinityScrollBoard/InfinityScrollBoard";

const Main = () => {
  const count = 5;

  return (
    <InfinityScrollBoard
      queryKey={["recentBoards", count]}
      fetchFunction={BoardApi.fetchRecentBoardAndNews}
      count={count}
    />
  );
};

export default Main;
