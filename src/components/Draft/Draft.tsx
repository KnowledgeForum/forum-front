import classes from "./Draft.module.scss";
import { useCallback, useState } from "react";

import ArrowUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete";

import { DraftBoard } from "@/types/board";
import Dialog from "../Dialog/Dialog";

type DraftProps = {
  drafs: Pick<DraftBoard, "draftId" | "title" | "createdTime">[] | null;
  onClick: (draftId: number) => void;
  onDelete: (draftId: number) => void;
};

const Draft = ({ drafs, onClick, onDelete }: DraftProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [clickedDraftId, setClickedDraftId] = useState<number | null>(null);

  const handleClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClickDraft = useCallback(() => {
    onClick(clickedDraftId!);
    setIsOpen((prev) => !prev);
    setIsOpenDialog(false);
  }, [clickedDraftId, onClick]);

  const handleDelete = useCallback(
    (draftId: number) => {
      onDelete(draftId);
    },
    [onDelete],
  );

  if (!drafs) return null;

  return (
    <>
      <Dialog
        isOpen={isOpenDialog}
        title="임시 저장 게시글 불러오기"
        confirmText="확인"
        onAction={() => handleClickDraft()}
        onCancel={() => setIsOpenDialog(false)}
      >
        <p>임시 저장된 글을 불러오시겠습니까?</p>
        <p>임시 저장된 글을 불러오게 되면, 기존에 작성하던 글은 저장되지 않습니다.</p>
      </Dialog>
      <div className={classes.draft}>
        <div className={classes.btn} onClick={handleClick}>
          <span>임시 저장 목록 ({drafs.length} / 10)</span>
          {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </div>
        {isOpen && (
          <table className={classes.table}>
            <thead>
              <tr>
                <th>제목</th>
                <th>작성 시간</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {drafs.map((draft) => (
                <tr
                  key={draft.draftId}
                  onClick={() => {
                    setIsOpenDialog(true);
                    setClickedDraftId(draft.draftId);
                  }}
                >
                  <td>{draft.title?.trim() || "제목 없음"}</td>
                  <td>{draft.createdTime}</td>
                  <td>
                    <span
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDelete(draft.draftId);
                      }}
                    >
                      <DeleteIcon className={classes.delete} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Draft;
