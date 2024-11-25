import { DragEvent, MouseEvent, useCallback, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

import classes from "./DragAndDrop.module.scss";

import useToast from "@/hooks/useToast";

type DragAndDropProps = {
  thumbnail?: File | string | null;
  onChange: (file: File | null) => void;
};

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const DragAndDrop = ({ onChange, thumbnail }: DragAndDropProps) => {
  const { showToast, ToastElement } = useToast();
  const [dragging, setDragging] = useState<boolean>(false);

  const handleDragEnter = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // 자식 요소로 이동할 때는 무시
    if (event.currentTarget.contains(event.relatedTarget as Node)) return;

    setDragging(false);
  }, []);

  const handleDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleChange = useCallback(
    (file: File | null) => {
      if (!file) {
        showToast.error("파일을 첨부해주세요.");
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        showToast.error("10MB 이하 파일만 첨부 가능합니다.");
        return;
      }

      const ext = file.name.split(".").pop();
      if (ext !== "jpeg" && ext !== "png" && ext !== "svg") {
        showToast.error("jpeg, png, svg 파일만 첨부 가능합니다.");
        return;
      }

      onChange(file);
    },
    [showToast, onChange],
  );

  const handleDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setDragging(false);

      if (event.dataTransfer.files.length) {
        const file = event.dataTransfer.files[0];
        handleChange(file);
      }
    },
    [handleChange],
  );

  const handleDelete = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onChange(null);
    },
    [onChange],
  );

  return (
    <>
      {ToastElement}
      <label
        className={`${classes.zone} ${dragging ? classes.dragging : ""}`}
        htmlFor="file"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {thumbnail ? (
          <div className={classes.imgBox}>
            <button className={classes.close} onClick={handleDelete}>
              <CloseIcon />
            </button>
            {thumbnail instanceof File ? (
              <img src={URL.createObjectURL(thumbnail)} alt="thumbnail" className={classes.thumbnail} />
            ) : (
              <img src={thumbnail} alt="thumbnail" className={classes.thumbnail} />
            )}
          </div>
        ) : (
          <div className={classes.desc}>
            <p className={classes.icon} />
            <span>10MB 이하 첨부 가능</span>
          </div>
        )}

        <input
          id="file"
          type="file"
          className={classes.file}
          accept="image/jpeg,image/png,image/svg+xml"
          onChange={(event) => handleChange(event.target.files ? event.target.files[0] : null)}
        />
      </label>
    </>
  );
};

export default DragAndDrop;
