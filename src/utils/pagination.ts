export const getNextPagination = ({
  itemLength,
  count,
  total,
  page,
}: {
  itemLength: number;
  count: number;
  total: number;
  page: number;
}) => {
  if (itemLength * count >= total) return undefined;
  return page + 1;
};
