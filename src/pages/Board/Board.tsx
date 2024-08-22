import { BoardApi } from "@/api/board";

import InfinityScrollBoard from "@/features/InfinityScrollBoard/InfinityScrollBoard";

const Board = () => {
  const count = 5;

  return (
    <InfinityScrollBoard queryKey={["recentBoards", count]} fetchFunction={BoardApi.fetchRecentBoards} count={count} />
  );
};

export default Board;
