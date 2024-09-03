import useUser from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { TextField } from "@mui/material";

import classes from "./PostForm.module.scss";

import { BoardType, DraftBoardList, RequestBoard, UpdateBoardDetail } from "@/types/board";
import { Tag } from "@/types/tag";

import { BoardApi } from "@/api/board";

import useToast from "@/hooks/useToast";

import TagSelect from "@/features/TagSelect/TagSelect";

import Editor from "../Editor/Editor";
import Select from "../Select/Select";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import Dialog from "../Dialog/Dialog";
import Draft from "../Draft/Draft";

import { checkAltValue } from "@/utils/doc";

type PostFormProps = {
  postSuccess: boolean;
  onPost: (request: RequestBoard) => void;
  boardId?: number;
};

const PostForm = ({ postSuccess, onPost, boardId }: PostFormProps) => {
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
  const { data: drafs } = useQuery<DraftBoardList | null>({
    queryKey: ["drafts"],
    initialData: null,
    queryFn: async () => {
      return await BoardApi.fetchDraftBoards();
    },
    enabled: !boardId,
  });
  const draftSummaries = useMemo(() => {
    if (!drafs) {
      return null;
    }

    return drafs.drafts.map((draft) => {
      return {
        draftId: draft.draftId,
        title: draft.title,
        createdTime: draft.createdTime,
      };
    });
  }, [drafs]);

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [request, setRequest] = useState<RequestBoard>({
    boardType: "N",
    title: "",
    content: "",
  });
  const [changeContent, setChangeContent] = useState<string>("");

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

  const handleDeleteDraft = useCallback((draftId: number) => {
    // TODO: 임시 저장 삭제 API 호출
    console.log("delete draft : ", draftId);
  }, []);

  const handleApplyDraft = useCallback(
    (draftId: number) => {
      const filteredDraft = drafs?.drafts.find((draft) => draft.draftId === draftId);
      if (!filteredDraft) {
        showToast.error("임시 저장된 게시글을 불러오는 중에 오류가 발생했습니다.");
        return;
      }

      setRequest({
        boardType: filteredDraft.boardType,
        title: filteredDraft?.title || "",
        content: filteredDraft?.content || "",
        thumbnail: filteredDraft?.thumbnail || null,
        imageIds: filteredDraft?.imageIds || [],
        tags: filteredDraft?.tags || [],
      });

      setChangeContent(filteredDraft.content || "");
    },
    [drafs?.drafts, showToast],
  );

  const handleBeforeUnload = useCallback((event: BeforeUnloadEvent) => {
    event.preventDefault();
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
      setRequest((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  const handleTags = useCallback((tags: Tag[]) => {
    setRequest((prev) => ({
      ...prev,
      tags: [...tags],
    }));
  }, []);

  const getUserImage = useCallback(() => {
    const filteredImageIds = request.imageIds?.filter((id) => checkAltValue(request.content, id));
    return filteredImageIds;
  }, [request.content, request.imageIds]);

  const handleImage = useCallback(
    (imageId?: number) => {
      if (imageId) {
        const filteredImageIds = getUserImage();

        setRequest((prev) => ({
          ...prev,
          imageIds: filteredImageIds ? [...filteredImageIds, imageId] : [...(prev.imageIds || []), imageId],
        }));
      } else {
        setRequest((prev) => ({
          ...prev,
          imageIds: getUserImage(),
        }));
      }
    },
    [getUserImage],
  );

  const handleContentChange = useCallback(
    (content: string) => {
      handleImage();
      handleChange("content", content);
    },
    [handleChange],
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

      setChangeContent(board.content);
    }
  }, [board, isLoaded]);

  useEffect(() => {
    if (handleBeforeUnload) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  useEffect(() => {
    if (postSuccess) {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      navigate("/");
    }
  }, [postSuccess, handleBeforeUnload, navigate]);

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
        onAction={() => {
          setIsOpenDialog(false);
          navigate(-1);
        }}
        onCancel={() => setIsOpenDialog(false)}
      >
        <p>게시글을 저장하지 않고 나가시겠습니까?</p>
      </Dialog>
      <form className={classes.form} onSubmit={handlePost}>
        <Draft drafs={draftSummaries} onClick={handleApplyDraft} onDelete={handleDeleteDraft} />
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
        {isLoaded && (
          <Editor
            isVisibleToolbar
            changeValue={changeContent}
            placeholder="내용을 입력해주세요."
            onChange={handleContentChange}
            onChangeImage={handleImage}
            className={classes.editor}
          />
        )}
        <TagSelect initialTags={request.tags} onSelect={handleTags} />
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
