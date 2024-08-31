import { forwardRef, ReactNode } from "react";
import { Dialog as MuiDialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import classes from "./Dialog.module.scss";

type DialogProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  confirmText?: string;
  primaryColor?: string;
  onAction: () => void;
  onCancel: () => void;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dialog = ({ isOpen, title, children, confirmText = "삭제", primaryColor, onAction, onCancel }: DialogProps) => {
  return (
    <MuiDialog open={isOpen} TransitionComponent={Transition} keepMounted onClose={onCancel} className={classes.dialog}>
      <div className={classes.title}>{title}</div>
      <div className={classes.description}>{children}</div>
      <div className={classes.btnBox}>
        <button className={classes.cancel} onClick={onCancel}>
          취소
        </button>
        <button
          className={classes.delete}
          onClick={onAction}
          style={{
            color: primaryColor,
          }}
        >
          {confirmText}
        </button>
      </div>
    </MuiDialog>
  );
};

export default Dialog;
