import { useCallback, useEffect } from "react";

type useDialogCloseBoundaryProps = {
  isVisible: boolean;
  buttonRef: React.RefObject<HTMLButtonElement>;
  modalRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
};

const useDialogCloseBoundary = ({ isVisible, buttonRef, modalRef, onClose }: useDialogCloseBoundaryProps) => {
  const handleVisible = useCallback(
    (event: MouseEvent) => {
      const modalInside = modalRef.current?.contains(event.target as Node);
      const buttonInside = buttonRef.current?.contains(event.target as Node);

      /**
       * Modal 내부를 클릭했거나, 버튼을 클릭한 경우에는 닫지 않음
       *
       * 버튼은 Modal 호출 부분에서 닫도록 정의하므로, 버튼을 클릭한 경우에는 닫지 않아야 함
       * 단, 버튼 클릭 시 이벤트는 제거해야 함.
       */
      if (modalInside) {
        return;
      } else if (buttonInside) {
        document.body.removeEventListener("click", handleVisible);
        return;
      }

      event.stopPropagation();
      onClose();

      document.body.removeEventListener("click", handleVisible);
    },
    [buttonRef, modalRef, onClose],
  );

  useEffect(() => {
    if (isVisible) {
      document.body.addEventListener("click", handleVisible);
    }

    return () => {
      document.body.removeEventListener("click", handleVisible);
    };
  }, [isVisible, handleVisible]);

  return undefined;
};

export default useDialogCloseBoundary;
