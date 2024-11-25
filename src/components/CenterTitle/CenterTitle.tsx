import classes from "./CenterTitle.module.scss";

type CenterTitleProps = {
  title: string;
  desc: string;
};

const CenterTitle = ({ title, desc }: CenterTitleProps) => {
  return (
    <div className={classes.centerTitle}>
      <h1 className={classes.title}>{title}</h1>
      <p className={classes.desc}>{desc}</p>
    </div>
  );
};

export default CenterTitle;
