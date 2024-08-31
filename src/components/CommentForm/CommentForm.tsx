import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./CommentForm.module.scss";

import FormButton from "../FormButton/ForumButton";

import useToast from "@/hooks/useToast";
import useUser from "@/hooks/useUser";
import Editor from "../Editor/Editor";

type CommentFormProps = {
  initialContent?: string;
  className?: string;
  onSubmit: (content: string) => void;
};

const CommentForm = ({ initialContent = "", className, onSubmit }: CommentFormProps) => {
  const { user } = useUser();
  const { showToast, ToastElement } = useToast();
  const navigate = useNavigate();

  const [content, setContent] = useState<string>(initialContent);

  const isDisabled = useMemo(() => content.trim() === "", [content]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isDisabled) {
        showToast.error("댓글을 입력해주세요.");
        return;
      }
      if (!user) {
        navigate(`/login?redirect=${window.location.pathname}`);
      }

      onSubmit(content.trim());
      setContent("");
    },
    [isDisabled, user, content, showToast, onSubmit, navigate],
  );

  const handleChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  return (
    <form onSubmit={handleSubmit} className={`${classes.form} ${className}`}>
      {ToastElement}
      <Editor initialValue={content} onChange={handleChange} isVisibleToolbar={false} placeholder="댓글" />
      <FormButton text="댓글 쓰기" isDisabled={isDisabled} />
    </form>
  );
};

export default CommentForm;
