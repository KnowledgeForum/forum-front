import { Link } from "react-router-dom";
import { Box, Skeleton } from "@mui/material";

import { IntroBoard } from "@/types/board";

import AsideLayout from "@/layouts/Aside/AsideLayout";

import classes from "./BoardNavigation.module.scss";

type BoardNavigationProps = {
  title: string;
  boards: IntroBoard[] | undefined;
  isLoading: boolean;
};

const BoardNavigation = ({ title, boards, isLoading }: BoardNavigationProps) => {
  return (
    <AsideLayout>
      <ul className={classes.ul}>
        <li className={classes.title}>{title}</li>
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, index) => (
                <Box display={"flex"} alignItems={"center"} gap={"0.625rem"} key={index}>
                  <Box>
                    <Skeleton variant="rounded" width={"3.625rem"} height={"3.625rem"} />
                  </Box>
                  <Box width={"100%"}>
                    <Skeleton variant="text" width={"100%"} />
                    <Skeleton variant="text" width={"100%"} />
                  </Box>
                </Box>
              ))
          : boards?.map((board) => (
              <li key={board.boardId}>
                <Link to={`/board/${board.boardId}`} className={classes.item}>
                  <img src={board.thumbnail} alt={board.title} className={classes.thumbnail} />
                  <div>
                    <p className={classes.title}>{board.title}</p>
                    <span className={classes.nickname}>By. {board.nickname}</span>
                  </div>
                </Link>
              </li>
            ))}
      </ul>
    </AsideLayout>
  );
};

export default BoardNavigation;
