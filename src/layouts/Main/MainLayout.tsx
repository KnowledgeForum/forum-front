import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import classes from "./MainLayout.module.scss";

/**
 * layouts 폴더는 페이지의 레이아웃(틀)이 되는 파일을 모아놓은 폴더입니다.
 */

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className={classes.layout}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
