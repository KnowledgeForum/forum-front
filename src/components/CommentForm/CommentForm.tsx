import { TextField } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./CommentForm.module.scss";

import FormButton from "../FormButton/ForumButton";

import useToast from "@/hooks/useToast";
import useUser from "@/hooks/useUser";

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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit} className={`${classes.form} ${className}`}>
      {ToastElement}
      {/* TODO: Tiptap으로 변경 */}
      <TextField
        type="text"
        autoComplete="off"
        variant="filled"
        label="댓글"
        fullWidth
        multiline
        value={content}
        onChange={handleChange}
      />
      <FormButton text="댓글 쓰기" isDisabled={isDisabled} />
    </form>
  );
};

export default CommentForm;
