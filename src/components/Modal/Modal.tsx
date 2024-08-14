import { forwardRef, Ref } from "react";
import classes from "./Modal.module.scss";

type ModalProps = {
  children: React.ReactNode;
  className?: string;
};

const Modal = forwardRef(({ children, className }: ModalProps, ref: Ref<HTMLDivElement>) => {
  return (
    <div className={`${classes.modal} ${className}`} ref={ref}>
      {children}
    </div>
  );
});

export default Modal;
