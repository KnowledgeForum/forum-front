import { Box, Grid, Skeleton } from "@mui/material";

const SkeletonBoardDetail = () => {
  return (
    <Box padding={"1.25rem"} borderRadius={"16px"} height={"100vh"} bgcolor={"#262d34"} overflow={"hidden"}>
      <Skeleton variant="rectangular" width={"100%"} height={"2.5rem"} style={{ marginBottom: "1rem" }} />
      <Skeleton variant="text" width={"60%"} height={"1.25rem"} style={{ marginBottom: "0.5rem" }} />
      <Skeleton variant="text" width={"80%"} height={"1.25rem"} style={{ marginBottom: "0.5rem" }} />
      <Skeleton variant="text" width={"90%"} height={"1.25rem"} style={{ marginBottom: "0.5rem" }} />
      <Skeleton variant="text" width={"70%"} height={"1.25rem"} style={{ marginBottom: "0.5rem" }} />
      <Skeleton variant="text" width={"50%"} height={"1.25rem"} style={{ marginBottom: "1rem" }} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Skeleton variant="rectangular" width={"100%"} height={"10rem"} />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="rectangular" width={"100%"} height={"10rem"} />
        </Grid>
      </Grid>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={"2.5rem"}
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Skeleton variant="rectangular" width={"100%"} height={"5rem"} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton variant="rectangular" width={"100%"} height={"5rem"} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton variant="rectangular" width={"100%"} height={"5rem"} />
        </Grid>
      </Grid>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={"2.5rem"}
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      />
      <Skeleton variant="text" width={"80%"} height={"1.25rem"} style={{ marginBottom: "0.5rem" }} />
      <Skeleton variant="text" width={"90%"} height={"1.25rem"} style={{ marginBottom: "0.5rem" }} />
      <Skeleton variant="text" width={"70%"} height={"1.25rem"} style={{ marginBottom: "0.5rem" }} />
      <Skeleton variant="text" width={"60%"} height={"1.25rem"} style={{ marginBottom: "0.5rem" }} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Skeleton variant="rectangular" width={"100%"} height={"5rem"} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton variant="rectangular" width={"100%"} height={"5rem"} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton variant="rectangular" width={"100%"} height={"5rem"} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SkeletonBoardDetail;
