import { useCallback, useEffect, useRef } from "react";

import classes from "./Modal.module.scss";

type ModalProps = {
  isOpen: boolean;
  btnRef: React.RefObject<HTMLButtonElement>;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

const Modal = ({ isOpen, btnRef, onClose, children, className }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (btnRef.current && btnRef.current.contains(event.target as Node)) {
        return;
      }

      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    },
    [btnRef, onClose],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  if (!isOpen) return null;

  return (
    <div className={`${classes.modal} ${className}`} ref={modalRef}>
      {children}
    </div>
  );
};

export default Modal;
