import { useEffect } from "react";
import hljs from "highlight.js";
import DOMPurify from "isomorphic-dompurify";

type EditorViewerProps = {
  content: string;
  className?: string;
};

const EditorViewer = ({ content, className }: EditorViewerProps) => {
  useEffect(() => {
    hljs.highlightAll();
  }, [content]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
      className={`tiptap ${className}`}
    ></div>
  );
};

export default EditorViewer;
