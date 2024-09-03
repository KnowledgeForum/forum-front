import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import classes from "./EmailVerifyLayout.module.scss";

type EmailData = {
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
};

type EmailVerifyLayoutProps = {
  children?: React.ReactNode;
  emailData: EmailData;
};

const EmailVerifyLayout = ({ children, emailData }: EmailVerifyLayoutProps) => {
  const navigate = useNavigate();

  const EmailVerifyClick = () => {
    navigate("/email/verify/code"); // 경로로 이동
  };

  return (
    <div className={classes.layout}>
      <div className={classes.top}>
        <div className={classes.title}>{emailData.title}</div>
        <div className={classes.description}>{emailData.description}</div>
      </div>

      <div className={classes.input}>
        <input
          type="email"
          //value = {email}
          placeholder={emailData.placeholder}
        ></input>
      </div>

      <button onClick={EmailVerifyClick}>
        <div className={classes.button}>{emailData.buttonText}</div>
      </button>
      {children}
      <Outlet />
    </div>
  );
};

export default EmailVerifyLayout;
