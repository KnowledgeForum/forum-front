import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { RequestBoard } from "@/types/board";

import PostForm from "@/components/PostForm/PostForm";

const Update = () => {
  const [postSuccess, setPostSuccess] = useState<boolean>(false);
  const params = useParams<{ boardId: string }>();
  const boardId: number = useMemo(() => {
    return params.boardId ? +params.boardId : 0;
  }, [params]);

  const handlePost = useCallback((request: RequestBoard) => {
    console.log(request);
    // TODO: Tags는 Tag[] 형태로 들어옵니다. => 따로 처리해주세요.

    // NOTE: 성공 시
    setPostSuccess(true);
  }, []);

  return <PostForm postSuccess={postSuccess} onPost={handlePost} boardId={boardId} />;
};

export default Update;
