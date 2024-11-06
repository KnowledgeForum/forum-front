import { Alert, Snackbar } from "@mui/material";

export type SeverityType = "success" | "info" | "warning" | "error";
export type VerticalType = "top" | "bottom";
export type HorizontalType = "left" | "center" | "right";

type ToastProps = {
  isOpen: boolean;
  severity: SeverityType;
  message: string;
  vertical: VerticalType;
  horizontal: HorizontalType;
};

const Toast = ({ isOpen, severity, message, vertical, horizontal }: ToastProps) => {
  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{
        vertical,
        horizontal,
      }}
    >
      <Alert
        variant="filled"
        severity={severity}
        style={{
          fontSize: "0.875rem",
        }}
      >
        {message.split("\n").map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
