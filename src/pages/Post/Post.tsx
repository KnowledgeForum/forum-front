import { useCallback, useState } from "react";

import { RequestBoard } from "@/types/board";

import PostForm from "@/components/PostForm/PostForm";

const Post = () => {
  const [postSuccess, setPostSuccess] = useState<boolean>(false);

  const handlePost = useCallback((request: RequestBoard) => {
    console.log(request);
    // TODO: Tags는 Tag[] 형태로 들어옵니다. => 따로 처리해주세요.

    // NOTE: 성공 시
    setPostSuccess(true);
  }, []);

  return <PostForm postSuccess={postSuccess} onPost={handlePost} />;
};

export default Post;
