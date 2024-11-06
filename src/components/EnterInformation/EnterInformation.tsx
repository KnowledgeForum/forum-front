import { useState } from "react";
import classes from "./EnterInformation.module.scss";

type EnterInformationProps = {
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
  inputType: string;
  onButtonClick: () => void;
  onChange: (value: string) => void;
};

const EnterInformation = ({
  title,
  description,
  placeholder,
  buttonText,
  inputType,
  onButtonClick,
  onChange,
}: EnterInformationProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={classes.contents}>
      <div className={classes.title}>{title}</div>
      <div className={classes.description}>{description}</div>

      <div className={classes.input}>
        <input type={inputType} placeholder={placeholder} value={inputValue} onChange={handleChangeInput}></input>
      </div>

      <button onClick={onButtonClick} className={classes.button}>
        {buttonText}
      </button>
    </div>
  );
};

export default EnterInformation;
