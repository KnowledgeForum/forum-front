import classes from "./FormButton.module.scss";

type FormButtonProps = {
  width?: string;
  text: string;
  isDisabled: boolean;
};

const FormButton = ({ width, text, isDisabled }: FormButtonProps) => {
  return (
    <button
      type="submit"
      className={`${classes.button} ${!isDisabled && classes.active}`}
      disabled={isDisabled}
      style={{ width }}
    >
      {text}
    </button>
  );
};

export default FormButton;
