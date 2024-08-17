import { IntroBoard } from "@/types/board";

import AsideLayout from "@/layouts/Aside/AsideLayout";

import classes from "./BoardNavigation.module.scss";
import { Link } from "react-router-dom";

type BoardNavigationProps = {
  title: string;
  boards: IntroBoard[];
};

const BoardNavigation = ({ title, boards }: BoardNavigationProps) => {
  return (
    <AsideLayout>
      <ul className={classes.ul}>
        <li className={classes.title}>{title}</li>
        {boards.map((board) => (
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
