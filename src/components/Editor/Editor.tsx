import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { Selection } from "prosemirror-state";

import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Markdown } from "tiptap-markdown";
import Underline from "@tiptap/extension-underline";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import ImageResize from "tiptap-extension-resize-image";
import Placeholder from "@tiptap/extension-placeholder";
import ListItem from "@tiptap/extension-list-item";

import classes from "./Editor.module.scss";

import Toolbar from "./Toolbar/Toolbar";

import { Indent } from "@/utils/indent";
import CustomCodeBlockLowlight from "@/utils/codeBlockIndent";
import { YoutubeResize } from "@/utils/youtubeResize";

type EditorProps = {
  changeValue?: string;
  isVisibleToolbar?: boolean;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
  onChangeImage?: (imageId: number) => void;
};

const Editor = ({
  changeValue = "",
  isVisibleToolbar = true,
  placeholder,
  className,
  onChange,
  onChangeImage,
}: EditorProps) => {
  const [content, setContent] = useState<string>("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        listItem: false,
      }),
      Link.extend({ inclusive: false }).configure({
        openOnClick: false,
      }),
      Table.configure({
        resizable: true,
      }),
      Underline,
      TableRow,
      TableHeader,
      TableCell,
      YoutubeResize.configure({ autoplay: false, interfaceLanguage: "ko" }),
      ImageResize.configure({ allowBase64: true }),
      Placeholder.configure({ placeholder: placeholder }),
      Markdown,
      CustomCodeBlockLowlight,
      Indent,
      ListItem,
    ],
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
    editorProps: {
      handleDOMEvents: {
        keydown: (view, event) => {
          if (event.key === "Enter") {
            const { state, dispatch } = view;
            const { $head } = state.selection;

            if (!$head.node(-1)) {
              dispatch(state.tr.insertText("\n"));
              return true;
            }

            const isBlockquote = $head.node(-1).type.name === "blockquote";
            // block quote일 경우에는 enter 시 blockquote 를 유지하고, 아닐 경우에는 줄바꿈을 한다.
            if (isBlockquote) {
              return true;
            }

            const endPos = state.doc.content.size;
            const tr = state.tr.setSelection(Selection.near(state.doc.resolve(endPos)));
            dispatch(tr.scrollIntoView().insertText("\n"));
          }

          return false;
        },
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    onChange(content);
  }, [editor, content, onChange]);

  useEffect(() => {
    if (!editor) return;
    if (changeValue === editor.getHTML()) return;

    editor.commands.setContent(changeValue);
    setContent(changeValue);
  }, [editor, changeValue]);

  if (!editor) {
    return;
  }

  return (
    <div className={classes.editorBox}>
      {isVisibleToolbar && <Toolbar editor={editor} onChangeImage={(imageId: number) => onChangeImage?.(imageId)} />}
      <EditorContent
        editor={editor}
        className={`${className} ${classes.editor}`}
        name="contents"
        minLength={5}
        required
      />
    </div>
  );
};

export default Editor;
