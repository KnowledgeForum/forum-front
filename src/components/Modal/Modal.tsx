import { useRef } from "react";

import classes from "./Modal.module.scss";
import useDialogCloseBoundary from "@/hooks/useDialogCloseBoundary";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useDialogCloseBoundary({
    isVisible: isOpen,
    modalRef,
    onClose,
  });

  if (!isOpen) return null;

  return (
    <div className={`${classes.modal} ${className}`} ref={modalRef}>
      {children}
    </div>
  );
};

export default Modal;
