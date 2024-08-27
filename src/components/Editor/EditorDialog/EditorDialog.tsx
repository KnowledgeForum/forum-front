import { useCallback, useEffect, useRef } from "react";

import styles from "./EditorDialog.module.scss";

export type ModalItem = {
  key: string;
  title: string;
  value: string | File;
  placeholder: string;
  type?: string;
};

type ModalProps = {
  isVisible: boolean;
  items: ModalItem[];
  onSubmit: () => void;
  onChange?: (key: string, changedVal: string) => void;
  onChangeFile?: (key: string, file: File) => void;
  closeVisible: () => void;
};

const EditorInputModal = ({ items, isVisible, onChange, onChangeFile, onSubmit, closeVisible }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleVisible = useCallback(
    (event: MouseEvent) => {
      const modalInside = modalRef.current?.contains(event.target as Node);
      if (modalInside) return;
      if (!isVisible) return;

      event.stopPropagation();
      closeVisible();
      document.body.removeEventListener("click", handleVisible);
    },
    [isVisible, closeVisible],
  );

  const handleChange = useCallback(
    (key: string, changedVal: string) => {
      onChange?.(key, changedVal);
    },
    [onChange],
  );

  const handleChangeFile = useCallback(
    (key: string, file: File) => {
      onChangeFile?.(key, file);
    },
    [onChangeFile],
  );

  const handleSubmit = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  useEffect(() => {
    if (isVisible) {
      document.body.addEventListener("click", handleVisible);
    } else {
      document.body.removeEventListener("click", handleVisible);
    }

    return () => {
      document.body.removeEventListener("click", handleVisible);
    };
  }, [handleVisible, isVisible]);

  if (!isVisible) return null;

  return (
    <div className={styles.modal} ref={modalRef}>
      {items.map((item: ModalItem) => (
        <div className={styles.box} key={item.key}>
          <div className={styles.title}>{item.title}</div>
          {item.type !== "file" ? (
            <input
              value={item.value as string}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(item.key, event.target.value)}
              placeholder={item.placeholder}
              type={item.type || "text"}
            />
          ) : (
            <input
              value=""
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const file = event.target.files?.[0];
                if (!file) return;

                handleChangeFile(item.key, file);
              }}
              type="file"
            />
          )}
        </div>
      ))}
      <div className={styles.modalBtnBox}>
        <button type="button" className={`${styles.modalBtn} ${styles.cancelBtn}`} onClick={closeVisible}>
          취소
        </button>
        <button type="button" className={`${styles.modalBtn} ${styles.activeBtn}`} onClick={handleSubmit}>
          확인
        </button>
      </div>
    </div>
  );
};

export default EditorInputModal;
