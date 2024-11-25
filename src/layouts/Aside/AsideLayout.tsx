import classes from "./AsideLayout.module.scss";

type AsideLayoutProps = {
  children: React.ReactNode;
};

const AsideLayout = ({ children }: AsideLayoutProps) => {
  return <aside className={classes.aside}>{children}</aside>;
};

export default AsideLayout;
