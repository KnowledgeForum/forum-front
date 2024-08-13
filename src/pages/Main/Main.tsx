import { Link } from "react-router-dom";

import classes from "./Main.module.scss";
import Counter from "../../features/Counter/Counter";
import useWindowSize from "../../hooks/useWindowSize";

/**
 * pages 폴더는 각 페이지를 모아놓은 폴더입니다.
 */

const Main = () => {
  const { width, height } = useWindowSize();

  return (
    <>
      <div className={classes.main}>Main Page</div>
      <Counter />
      <Link to="/news">News 페이지</Link>
      <p>
        {width} : {height}
      </p>
    </>
  );
};

export default Main;
