import classes from "./EnterInformation.module.scss";

type EnterInformationProps = {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  isButtonDisabled?: boolean; // 추가: 버튼 비활성화 여부
  children?: React.ReactNode;
};

const EnterInformation = ({
  title,
  description,
  buttonText,
  onButtonClick,
  isButtonDisabled = false,
  children,
}: EnterInformationProps) => {
  const handleButtonClick = () => {
    onButtonClick();
  };

  return (
    <div className={classes.contents}>
      <div className={classes.title}>{title}</div>
      <div className={classes.description}>{description}</div>

      <div className={classes.input}>{children}</div>

      <button
        onClick={handleButtonClick}
        className={`${classes.button} ${isButtonDisabled ? classes.inactiveButton : classes.activeButton}`}
        disabled={isButtonDisabled} // 버튼 비활성화 상태를 isButtonDisabled로 제어
      >
        {buttonText}
      </button>
    </div>
  );
};

export default EnterInformation;
