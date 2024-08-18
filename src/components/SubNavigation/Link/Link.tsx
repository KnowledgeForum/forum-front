import { Link as RouterLink, useLocation } from "react-router-dom";

import classes from "./Link.module.scss";

type LinkData = {
  to: string;
  icon: string;
  title: string;
  description: string;
};

type LinkProps = {
  data: LinkData;
  color?: string;
  unReadCount?: number;
};

const Link = ({ data, color, unReadCount }: LinkProps) => {
  const router = useLocation();

  return (
    <RouterLink to={data.to} className={`${classes.link} ${router.pathname === data.to && classes.active}`}>
      <div className={classes.icon} style={{ backgroundColor: color || "#2c353d", opacity: color && 0.8 }}>
        <img src={data.icon} alt={`${data.title} 아이콘`} width={28} height={28} />
      </div>
      <div className={classes.info}>
        <p className={classes.title}>{data.title}</p>
        <p className={classes.description}>{data.description}</p>
        {unReadCount && unReadCount > 0 ? <span className={classes.badge}>{unReadCount}</span> : null}
      </div>
    </RouterLink>
  );
};

export default Link;
