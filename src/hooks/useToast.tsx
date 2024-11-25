import Toast, { HorizontalType, SeverityType, VerticalType } from "@/components/Toast/Toast";
import { useState } from "react";

const useToast = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<SeverityType>("success");
  const [vertical, setVertical] = useState<VerticalType>("top");
  const [horizontal, setHorizontal] = useState<HorizontalType>("right");

  const showToast = {
    success: (
      message: string,
      duration: number = 3000,
      vertical: VerticalType = "top",
      horizontal: HorizontalType = "right",
    ) => {
      setIsOpen(true);
      changeState(message, "success", vertical, horizontal);

      setTimeout(() => {
        setIsOpen(false);
      }, duration);
    },
    info: (
      message: string,
      duration: number = 3000,
      vertical: VerticalType = "top",
      horizontal: HorizontalType = "right",
    ) => {
      setIsOpen(true);
      changeState(message, "info", vertical, horizontal);

      setTimeout(() => {
        setIsOpen(false);
      }, duration);
    },
    warning: (
      message: string,
      duration: number = 3000,
      vertical: VerticalType = "top",
      horizontal: HorizontalType = "right",
    ) => {
      setIsOpen(true);
      changeState(message, "warning", vertical, horizontal);

      setTimeout(() => {
        setIsOpen(false);
      }, duration);
    },
    error: (
      message: string,
      duration: number = 3000,
      vertical: VerticalType = "top",
      horizontal: HorizontalType = "right",
    ) => {
      setIsOpen(true);
      changeState(message, "error", vertical, horizontal);

      setTimeout(() => {
        setIsOpen(false);
      }, duration);
    },
  };

  const changeState = (message: string, severity: SeverityType, vertical: VerticalType, horizontal: HorizontalType) => {
    setMessage(message);
    setSeverity(severity);
    setVertical(vertical);
    setHorizontal(horizontal);
  };

  const ToastElement = (
    <Toast isOpen={isOpen} message={message} severity={severity} vertical={vertical} horizontal={horizontal} />
  );

  return {
    ToastElement,
    showToast,
  };
};

export default useToast;
