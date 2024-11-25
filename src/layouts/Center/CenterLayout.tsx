import { Outlet } from "react-router-dom";

import classes from "./CenterLayout.module.scss";

const CenterLayout = () => {
  return (
    <main className={classes.layout}>
      <div className={classes.content}>
        <Outlet />
      </div>
    </main>
  );
};

export default CenterLayout;
