import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Markdown } from "tiptap-markdown";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import ImageResize from "tiptap-extension-resize-image";
import Placeholder from "@tiptap/extension-placeholder";

import classes from "./Editor.module.scss";

import Toolbar from "./Toolbar/Toolbar";

import { Indent } from "@/utils/indent";
import CustomCodeBlockLowlight from "@/utils/codeBlockIndent";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";

type EditorProps = {
  value: string;
  isVisibleToolbar?: boolean;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
  onChangeImage?: (imageId: number) => void;
};

const Editor = ({ value, isVisibleToolbar = true, placeholder, className, onChange, onChangeImage }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Link.extend({ inclusive: false }).configure({
        openOnClick: false,
      }),
      Youtube.configure({
        autoplay: false,
        interfaceLanguage: "ko",
      }),
      Table.configure({
        resizable: true,
      }),
      BulletList,
      ListItem,
      Underline,
      TableRow,
      TableHeader,
      TableCell,
      ImageResize.configure({ allowBase64: true }),
      Placeholder.configure({ placeholder: placeholder }),
      Markdown,
      CustomCodeBlockLowlight,
      ListItem,
      Indent,
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return;

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
