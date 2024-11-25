import classes from "./AuthLayout.module.scss";

import LogoIcon from "/public/logo-color.svg";

import Sns from "@/features/Sns/Sns";

import CenterTitle from "@/components/CenterTitle/CenterTitle";

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  desc: string;
};

const AuthLayout = ({ children, title, desc }: AuthLayoutProps) => {
  return (
    <div className={classes.authLayout}>
      <img src={LogoIcon} alt="로고 이미지" width={45} height={45} />
      <CenterTitle title={title} desc={desc} />
      <Sns />
      <div className={classes.line} />
      {children}
    </div>
  );
};

export default AuthLayout;
