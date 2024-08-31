import useUser from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { TextField } from "@mui/material";

import classes from "./PostForm.module.scss";

import { BoardType, RequestBoard, UpdateBoardDetail } from "@/types/board";

import { BoardApi } from "@/api/board";

import useToast from "@/hooks/useToast";

import TagSelect from "@/features/TagSelect/TagSelect";

import Editor from "../Editor/Editor";
import Select from "../Select/Select";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import Dialog from "../Dialog/Dialog";

import { checkAltValue } from "@/utils/doc";
import { Tag } from "@/types/tag";

type PostFormProps = {
  onPost: (request: RequestBoard) => void;
  boardId?: number;
};

const PostForm = ({ onPost, boardId }: PostFormProps) => {
  const navigate = useNavigate();
  const { showToast, ToastElement } = useToast();
  const { user, isLoaded } = useUser();
  const { data: board, isError } = useQuery<UpdateBoardDetail | null>({
    queryKey: ["board", boardId],
    initialData: null,
    queryFn: async () => {
      return await BoardApi.fetchBoardDetailByUpdate(boardId!);
    },
    enabled: !!boardId,
  });
  // TODO: 임시 저장한 게시글 가져오기

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [request, setRequest] = useState<RequestBoard>({
    boardType: "N",
    title: "",
    content: "",
  });

  const topics: { value: BoardType; label: string }[] = useMemo(() => {
    return [
      { value: "N", label: "뉴스" },
      { value: "B", label: "게시글" },
    ];
  }, []);

  const handleBack = useCallback((event: MouseEvent) => {
    event.preventDefault();
    setIsOpenDialog(true);
  }, []);

  const handleSaveDraft = useCallback(() => {
    // TODO: 임시 저장 API 호출
    console.log(request);
  }, [request]);

  const handlePost = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (!user) {
        navigate(`/login?redirect=${window.location.pathname}`);
        return;
      }

      if (!request.boardType) {
        showToast.error("토픽을 선택해주세요.");
        return;
      }

      if (!request.title || !request.title.trim()) {
        showToast.error("제목을 입력해주세요.");
        return;
      }

      if (request.title.length < 2) {
        showToast.error("제목은 2자 이상 입력해주세요.");
        return;
      }

      if (!request.content || !request.content.trim()) {
        showToast.error("내용을 입력해주세요.");
        return;
      }

      if (!request.tags || request.tags.length === 0) {
        showToast.error("태그를 선택해주세요.");
        return;
      }

      if (request.tags.length > 3) {
        showToast.error("태그는 최대 3개까지 선택 가능합니다.");
        return;
      }

      onPost(request);
    },
    [user, request, showToast, onPost, navigate],
  );

  const handleChange = useCallback(
    <K extends keyof Omit<RequestBoard, "imageIds" | "tagIds">>(key: K, value: RequestBoard[K]) => {
      let filteredImageIds = undefined;

      if (key === "content") {
        filteredImageIds = request.imageIds?.filter((id) => checkAltValue(request.content, id));
      }

      setRequest((prev) => ({
        ...prev,
        [key]: value,
        imageIds: filteredImageIds ? [...filteredImageIds] : prev.imageIds,
      }));
    },
    [request.content, request.imageIds],
  );

  const handleTags = useCallback((tags: Tag[]) => {
    setRequest((prev) => ({
      ...prev,
      tags: [...tags],
    }));
  }, []);

  const handleImage = useCallback(
    (imageId: number) => {
      const filteredImageIds = request.imageIds?.filter((id) => checkAltValue(request.content, id));

      setRequest((prev) => ({
        ...prev,
        imageIds: filteredImageIds ? [...filteredImageIds, imageId] : [...(prev.imageIds || []), imageId],
      }));
    },
    [request.content, request.imageIds],
  );

  useEffect(() => {
    if (isLoaded && board) {
      setRequest({
        boardType: board.boardType,
        title: board.title,
        content: board.content,
        thumbnail: board.thumbnail,
        imageIds: board.imageIds,
        tags: board.tags,
      });
    }
  }, [board, isLoaded]);

  useEffect(() => {
    if (!boardId) {
      const isAccept = window.confirm("임시 저장된 게시글이 있습니다. 불러오시겠습니까?");
      if (isAccept) {
        // TODO: 임시 저장된 게시글 : Request 연결
      }
    }
  }, [boardId]);

  if (!user && isLoaded) {
    navigate(`/login?redirect=${window.location.pathname}`);
    return;
  }

  if (isError) {
    alert("게시글을 불러오는 중에 오류가 발생했습니다.");
    navigate(-1);
    return;
  }

  return (
    <>
      {ToastElement}
      <Dialog
        isOpen={isOpenDialog}
        title="뒤로 가기"
        confirmText="나가기"
        onDelete={() => {
          setIsOpenDialog(false);
          navigate(-1);
        }}
        onCancel={() => setIsOpenDialog(false)}
      >
        <p>게시글을 저장하지 않고 나가시겠습니까?</p>
      </Dialog>
      <form className={classes.form} onSubmit={handlePost}>
        <Select
          label="토픽"
          value={request.boardType}
          items={topics}
          onChange={(value: string) => handleChange("boardType", value as BoardType)}
          required
          disabled={!!boardId}
        />
        <TextField
          variant="filled"
          label="제목"
          autoComplete="off"
          value={request.title}
          onChange={(event) => handleChange("title", event.target.value)}
          fullWidth
          required
        />
        <DragAndDrop thumbnail={request.thumbnail} onChange={(file: File | null) => handleChange("thumbnail", file)} />
        {boardId ? (
          isLoaded &&
          request.content && (
            <Editor
              isVisibleToolbar
              initialValue={request.content}
              placeholder="내용을 입력해주세요."
              onChange={(content: string) => handleChange("content", content)}
              onChangeImage={handleImage}
              className={classes.editor}
            />
          )
        ) : (
          <Editor
            isVisibleToolbar
            initialValue=""
            placeholder="내용을 입력해주세요."
            onChange={(content: string) => handleChange("content", content)}
            onChangeImage={handleImage}
            className={classes.editor}
          />
        )}
        <TagSelect initialTags={board?.tags} onSelect={handleTags} />
        <div className={classes.btnBox}>
          <button type="button" className={classes.btn} onClick={handleBack}>
            취소
          </button>
          <div className={classes.right}>
            <button type="button" className={classes.btn} onClick={handleSaveDraft}>
              임시저장
            </button>
            <button type="submit" className={classes.post} onClick={handlePost}>
              {boardId ? "수정" : "등록"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PostForm;
