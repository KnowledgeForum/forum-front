import { Outlet } from "react-router-dom";
import Header from "@components/Header/Header";

import classes from "./MainLayout.module.scss";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className={classes.layout}>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
