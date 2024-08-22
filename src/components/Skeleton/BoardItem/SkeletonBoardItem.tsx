import { Box, Skeleton } from "@mui/material";

const SkeletonBoardItem = () => {
  return (
    <Box display={"flex"} gap={"1.25rem"} padding={"1.25rem"} borderRadius={"16px"} bgcolor={"#262d34"}>
      <Skeleton variant="rounded" width={"9.75rem"} height={"9.75rem"} style={{ borderRadius: 8 }} />
      <Box width={"100%"}>
        <Skeleton variant="text" width={"100%"} height={"3.75rem"} />
        <Skeleton variant="text" width={"100%"} height={"1.875rem"} />
        <Skeleton variant="text" width={"100%"} height={"1.875rem"} />
      </Box>
    </Box>
  );
};

export default SkeletonBoardItem;
