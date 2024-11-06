import { Outlet } from "react-router-dom";
import Vectersvg from "@/assets/Vector 17.svg";
import classes from "./EmailVerifyLayout.module.scss";

type EmailVerifyLayoutProps = {
  children: React.ReactNode;
};

const EmailVerifyLayout = ({ children }: EmailVerifyLayoutProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.layout}>
        <img src={Vectersvg} alt="로고 이미지" width={25} height={25}></img>
        <Outlet />
        {children}
      </div>
    </div>
  );
};

export default EmailVerifyLayout;
