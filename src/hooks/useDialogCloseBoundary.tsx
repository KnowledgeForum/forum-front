import { useCallback, useEffect } from "react";

type useDialogCloseBoundaryProps = {
  isVisible: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
};

const useDialogCloseBoundary = ({ isVisible, modalRef, onClose }: useDialogCloseBoundaryProps) => {
  const handleVisible = useCallback(
    (event: MouseEvent) => {
      // modal 여는 button을 클릭했다면
      const btnInside = (event.target as HTMLElement).closest("button");
      if (btnInside) {
        return;
      }

      const modalInside = modalRef.current?.contains(event.target as Node);

      /**
       * Modal 내부를 클릭했거나, 버튼을 클릭한 경우에는 닫지 않음
       *
       * 버튼은 Modal 호출 부분에서 닫도록 정의하므로, 버튼을 클릭한 경우에는 닫지 않아야 함
       * 단, 버튼 클릭 시 이벤트는 제거해야 함.
       */
      if (modalInside) {
        return;
      }

      onClose();

      document.body.removeEventListener("click", handleVisible, {
        capture: true,
      });
    },
    [modalRef, onClose],
  );

  useEffect(() => {
    /**
     * 캡처링 -> 타깃 -> 버블링 순으로 이벤트가 전파됨
     * capture: true로 설정하여, 이벤트 캡처링 단계에서 실행되도록 함
     * document.body는 가장 상위 요소이며,
     *    이벤트 등록 당시에는 캡처링 단계가 지나갔으므로(notification button event는 버블링 단계에서 시작됐음), handleVisible 함수가 실행되지 않음
     * capture: true로 설정하지 않으면, 버블링 단계에서 이벤트가 실행되므로, document.body까지 전파되어 handleVisible이 실행됨
     */
    if (isVisible) {
      document.body.addEventListener("click", handleVisible, {
        capture: true,
      });
    } else {
      document.body.removeEventListener("click", handleVisible, {
        capture: true,
      });
    }

    return () => {
      document.body.removeEventListener("click", handleVisible, {
        capture: true,
      });
    };
  }, [isVisible, handleVisible]);

  return undefined;
};

export default useDialogCloseBoundary;
