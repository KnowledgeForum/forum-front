import { Outlet } from "react-router-dom";

import Desktopheader from "@/components/Header/DesktopHeader/DesktopHeader";
import Mobileheader from "@/components/Header/MobileHeader/MobileHeader";

import classes from "./MainLayout.module.scss";

import useWindowSize from "@/hooks/useWindowSize";
import useUser from "@/hooks/useUser";
import { useEffect } from "react";

const MainLayout = () => {
  const tabeltSize = 992;
  const { width } = useWindowSize();
  const { user } = useUser();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      {width > tabeltSize ? <Desktopheader user={user} /> : <Mobileheader user={user} />}
      <div className={classes.layout}>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
