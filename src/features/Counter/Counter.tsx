import { useState } from "react";
import classes from "./Counter.module.scss";

/**
 * features 폴더는 기능을 포함하고 있는 컴포넌트들이 저장되는 폴더입니다.
 */

const Counter = () => {
  const [counter, setCounter] = useState<number>(0);

  return (
    <button className={classes.counter} onClick={() => setCounter((prev) => prev + 1)}>
      Counter: {counter}
    </button>
  );
};

export default Counter;
