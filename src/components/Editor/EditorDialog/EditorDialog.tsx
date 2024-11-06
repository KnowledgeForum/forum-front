import { useCallback, useRef } from "react";

import styles from "./EditorDialog.module.scss";
import useDialogCloseBoundary from "@/hooks/useDialogCloseBoundary";

export type ModalItem = {
  key: string;
  title: string;
  value: string | File;
  placeholder?: string;
  type?: string;
};

type ModalProps = {
  isVisible: boolean;
  items: ModalItem[];
  onSubmit: () => void;
  closeVisible: () => void;
  onChange?: (key: string, changedVal: string) => void;
  onChangeFile?: (key: string, file: File) => void;
};

const EditorInputModal = ({ items, isVisible, onChange, onChangeFile, onSubmit, closeVisible }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useDialogCloseBoundary({ isVisible, modalRef, onClose: closeVisible });

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
