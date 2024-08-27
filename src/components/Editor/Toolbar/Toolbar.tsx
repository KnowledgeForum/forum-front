import { MouseEvent, useCallback, useMemo, useState } from "react";
import { Editor } from "@tiptap/react";

import styles from "./Toolbar.module.scss";

import EditorDialog from "@/components/Editor/EditorDialog/EditorDialog";

type ToolbarProps = {
  editor: Editor;
  onChangeImage?: (imageId: number) => void;
};

type ModalItems = "link" | "youtube" | "table" | "image";

type ModalState = {
  [key in ModalItems]: boolean;
};

type ModalItem = {
  [key in ModalItems]: {
    key: string;
    title: string;
    value: string | File;
    placeholder: string;
    type?: string;
  }[];
};

const Toolbar = ({ editor, onChangeImage }: ToolbarProps) => {
  const linkKeys = useMemo(() => ["url", "text"], []);
  const youtubeKeys = useMemo(() => ["width", "height", "url"], []);
  const tableKeys = useMemo(() => ["row", "cell"], []);
  const imageKeys = useMemo(() => ["url", "file"], []);

  const [modals, setModals] = useState<ModalState>({
    link: false,
    youtube: false,
    table: false,
    image: false,
  });

  const [items, setItems] = useState<ModalItem>({
    link: [
      { key: linkKeys[0], title: "URL", value: "", placeholder: "URL 입력" },
      { key: linkKeys[1], title: "Text", value: "", placeholder: "대체할 텍스트 입력" },
    ],
    youtube: [
      { key: youtubeKeys[0], title: "너비", value: "320", placeholder: "너비 입력", type: "number" },
      { key: youtubeKeys[1], title: "높이", value: "180", placeholder: "높이 입력", type: "number" },
      { key: youtubeKeys[2], title: "URL", value: "", placeholder: "Yotubue URL 입력" },
    ],
    table: [
      { key: tableKeys[0], title: "Row", value: "1", placeholder: "Row 입력", type: "number" },
      { key: tableKeys[1], title: "Column", value: "1", placeholder: "Column 입력", type: "number" },
    ],
    image: [
      { key: imageKeys[0], title: "URL", value: "", placeholder: "이미지 URL 입력" },
      { key: imageKeys[1], title: "파일 선택", value: "", placeholder: "", type: "file" },
    ],
  });

  const toggleModal = useCallback((type: ModalItems, event?: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();

    setModals((prev) => ({
      link: false,
      youtube: false,
      table: false,
      image: false,
      [type]: !prev[type],
    }));
  }, []);

  const changeValue = useCallback((type: ModalItems, key: string, value: string | File) => {
    setItems((prev) => {
      const newItems = [...prev[type]];
      const index = newItems.findIndex((item) => item.key === key);
      newItems[index].value = value;

      return { ...prev, [type]: newItems };
    });
  }, []);

  const setLink = useCallback(() => {
    if (!items.link[0].value || !items.link[1].value) return;

    const { state } = editor;
    const { selection } = state;
    const { from, to } = selection;
    const { $from } = selection;

    const isTextSelected = from < to;
    const nodeAtSelection = $from.node();
    let tr;

    // 드래그 한 후 텍스트 선택 시
    if (nodeAtSelection && nodeAtSelection.type.name !== "codeBlock" && isTextSelected) {
      const href = items.link[0].value;
      const text = items.link[1].value;

      tr = state.tr.deleteSelection();
      tr = state.tr.insertText(text as string);

      const linkMarkType = state.schema.marks.link;
      const linkMark = linkMarkType.create({ href: href });
      // 새로 넣은 텍스트 시작 위치(from)부터 끝 위치(to)를 링크로 변경
      tr = tr.addMark(from, from + (text as string).length, linkMark);

      editor.view.dispatch(tr);
    } else if (nodeAtSelection.type.name !== "codeBlock") {
      editor
        .chain()
        .focus()
        .setLink({
          href: items.link[0].value as string,
        })
        .insertContent(items.link[1].value as string)
        .run();
    }

    const newLinkItems = [...items.link];
    newLinkItems[0].value = "";
    newLinkItems[1].value = "";

    setItems((prev) => ({ ...prev, link: newLinkItems }));
    toggleModal("link");
  }, [editor, items.link, toggleModal]);

  const setYoutube = useCallback(() => {
    editor.commands.setYoutubeVideo({
      src: items.youtube[2].value as string,
      width: !isNaN(Number(items.youtube[0].value)) ? Number(items.youtube[0].value) : 320,
      height: !isNaN(Number(items.youtube[1].value)) ? Number(items.youtube[1].value) : 180,
    });

    const newYoutubeItems = [...items.youtube];
    newYoutubeItems[0].value = "320";
    newYoutubeItems[1].value = "180";
    newYoutubeItems[2].value = "";

    setItems((prev) => ({ ...prev, youtube: newYoutubeItems }));
    toggleModal("youtube");
  }, [editor.commands, items.youtube, toggleModal]);

  const setTable = useCallback(() => {
    const rows = !isNaN(Number(items.table[0].value)) ? Number(items.table[0].value) : 1;
    const cols = !isNaN(Number(items.table[1].value)) ? Number(items.table[1].value) : 1;
    if (rows <= 0 || cols <= 0) return;

    editor.commands.insertTable({
      rows: rows,
      cols: cols,
      withHeaderRow: false,
    });

    const newTableItems = [...items.table];
    newTableItems[0].value = "1";
    newTableItems[1].value = "1";

    setItems((prev) => ({ ...prev, table: newTableItems }));
    toggleModal("table");
  }, [editor.commands, items.table, toggleModal]);

  const setImage = useCallback(
    async ({ url, file }: { url?: string; file?: File }) => {
      toggleModal("image");
      if (!url && !file) return;

      if (file) {
        try {
          editor.commands.setImage({ src: URL.createObjectURL(file), alt: file.name });
          onChangeImage?.(1);
        } catch (error) {
          console.error(error);
        }
      } else {
        editor.commands.setImage({ src: url as string });
      }

      const newImageItems = [...items.image];
      newImageItems[0].value = "";
      newImageItems[1].value = "";

      setItems((prev) => ({ ...prev, image: newImageItems }));
    },
    [items.image, editor.commands, onChangeImage, toggleModal],
  );

  return (
    <div className={styles.toolbar}>
      <div className={styles.itemBox}>
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.h1} ${
            editor.isActive("heading", { level: 2 }) ? styles.active : null
          }`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.h2} ${
            editor.isActive("heading", { level: 3 }) ? styles.active : null
          }`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
        />
      </div>
      <div className={styles.line} />
      <div className={styles.itemBox}>
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.bold} ${editor.isActive("bold") ? styles.active : null}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        />
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.italic} ${editor.isActive("italic") ? styles.active : null}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        />
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.underline} ${editor.isActive("underline") ? styles.active : null}`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
        />
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.strike} ${editor.isActive("strike") ? styles.active : null}`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        />
      </div>
      <div className={styles.line} />
      <div className={styles.itemBox}>
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.bulleted} ${editor.isActive("bulletList") ? styles.active : null}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.numbered} ${editor.isActive("orderedList") ? styles.active : null}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
      </div>
      <div className={styles.line} />
      <div className={styles.itemBox}>
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.quote} ${editor.isActive("blockquote") ? styles.active : null}`}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <div className={styles.modalBox}>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${styles.link} ${editor.isActive("link") ? styles.active : null}`}
            onClick={(event) => toggleModal("link", event)}
          />
          <EditorDialog
            isVisible={modals.link}
            items={items.link}
            closeVisible={() => toggleModal("link")}
            onChange={(key, value) => changeValue("link", key, value)}
            onSubmit={setLink}
          />
        </div>
        <div className={styles.modalBox}>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${styles.image}`}
            onClick={(event) => toggleModal("image", event)}
          />
          <EditorDialog
            isVisible={modals.image}
            items={items.image}
            closeVisible={() => toggleModal("image")}
            onChange={(key, value) => changeValue("image", key, value)}
            onChangeFile={(key, file) => {
              changeValue("image", key, file);
              setImage({ file });
            }}
            onSubmit={() => setImage({ url: items.image[0].value as string })}
          />
        </div>
        <div className={styles.modalBox}>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${styles.youtube}`}
            onClick={(event) => toggleModal("youtube", event)}
          />
          <EditorDialog
            isVisible={modals.youtube}
            items={items.youtube}
            closeVisible={() => toggleModal("youtube")}
            onChange={(key, value) => changeValue("youtube", key, value)}
            onSubmit={setYoutube}
          />
        </div>
        <div className={styles.modalBox}>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${styles.table}`}
            onClick={(event) => toggleModal("table", event)}
          />
          <EditorDialog
            isVisible={modals.table}
            items={items.table}
            closeVisible={() => toggleModal("table")}
            onChange={(key, value) => changeValue("table", key, value)}
            onSubmit={setTable}
          />
        </div>
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.newline}`}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
      </div>
    </div>
  );
};

export default Toolbar;
