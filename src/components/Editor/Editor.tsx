import { useEditor, EditorContent } from "@tiptap/react";

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
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";

import classes from "./Editor.module.scss";

import Toolbar from "./Toolbar/Toolbar";

import { Indent } from "@/utils/indent";
import CustomCodeBlockLowlight from "@/utils/codeBlockIndent";
import { YoutubeResize } from "@/utils/youtubeResize";

type EditorProps = {
  initialValue: string;
  isVisibleToolbar?: boolean;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
  onChangeImage?: (imageId: number) => void;
};

const Editor = ({
  initialValue,
  isVisibleToolbar = true,
  placeholder,
  className,
  onChange,
  onChangeImage,
}: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Link.extend({ inclusive: false }).configure({
        openOnClick: false,
      }),
      Table.configure({
        resizable: true,
      }),
      OrderedList,
      BulletList,
      ListItem,
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
    ],
    content: initialValue,
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
