import { Link } from "react-router-dom";

import classes from "./News.module.scss";

/**
 * pages 폴더는 각 페이지를 모아놓은 폴더입니다.
 */

const News = () => {
  return (
    <>
      <div className={classes.news}>News Page</div>
      <Link to="/">Main 페이지</Link>
    </>
  );
};

export default News;
