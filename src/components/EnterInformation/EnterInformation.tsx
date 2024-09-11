import classes from "./EnterInformation.module.scss";

type EnterInformationProps = {
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
  inputType: string;
  onButtonClick: () => void;
};

const EnterInformation = ({
  title,
  description,
  placeholder,
  buttonText,
  inputType,
  onButtonClick,
}: EnterInformationProps) => {
  return (
    <div className={classes.contents}>
      <div className={classes.title}>{title}</div>
      <div className={classes.description}>{description}</div>

      <div className={classes.input}>
        <input type={inputType} placeholder={placeholder}></input>
      </div>

      <button onClick={onButtonClick} className={classes.button}>
        {buttonText}
      </button>
    </div>
  );
};

export default EnterInformation;
