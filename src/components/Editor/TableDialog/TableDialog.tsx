import { createRef, MouseEvent, RefObject, useCallback, useRef } from "react";

import classes from "./TableDialog.module.scss";

import useDialogCloseBoundary from "@/hooks/useDialogCloseBoundary";

type TableItem = {
  row: number;
  col: number;
};

type TableDialogProps = {
  isVisible: boolean;
  item: TableItem;
  onSubmit: () => void;
  onChange: ({ col, row }: { col: number; row: number }) => void;
  onCloseVisible: () => void;
};

const TableDialog = ({ isVisible, item, onSubmit, onChange, onCloseVisible }: TableDialogProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<RefObject<HTMLTableCellElement>[][]>(
    Array.from({ length: 10 }).map(() => Array.from({ length: 10 }).map(() => createRef<HTMLTableCellElement>())),
  );

  const handleMouseEnter = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLTableCellElement;
      const activeRowIdx = Number(target.getAttribute("aria-rowcount") || 0);
      const activeColIdx = Number(target.getAttribute("aria-colcount") || 0);

      colRefs.current.flat().forEach((cell) => {
        const item = cell as unknown as HTMLTableCellElement;
        const rowIdx = Number(item.getAttribute("aria-rowcount") || 0);
        const colIdx = Number(item.getAttribute("aria-colcount") || 0);

        const shouldHover = rowIdx <= activeRowIdx && colIdx <= activeColIdx;
        item.classList.toggle(classes.hover, shouldHover);
      });

      onChange({ col: activeColIdx + 1, row: activeRowIdx + 1 });
    },
    [onChange],
  );

  useDialogCloseBoundary({ isVisible, modalRef, onClose: onCloseVisible });

  if (!isVisible) return null;

  return (
    <div ref={modalRef} className={classes.modal}>
      <table className={classes.table}>
        <tbody>
          {Array.from({ length: 10 }).map((_, row) => (
            <tr key={row} className={classes.row}>
              {Array.from({ length: 10 }).map((_, col) => (
                <td
                  ref={(el) => {
                    if (!el) return;
                    colRefs.current[row][col] = el as unknown as RefObject<HTMLTableCellElement>;
                  }}
                  key={col}
                  className={classes.cell}
                  aria-rowcount={row}
                  aria-colcount={col}
                  onMouseEnter={handleMouseEnter}
                  onMouseDown={onSubmit}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className={classes.text}>
        {item.row} x {item.col}
      </p>
    </div>
  );
};

export default TableDialog;
