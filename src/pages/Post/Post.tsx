import PostForm from "@/components/PostForm/PostForm";
import { RequestBoard } from "@/types/board";
import { useCallback } from "react";

const Post = () => {
  const handlePost = useCallback((request: RequestBoard) => {
    console.log(request);
    // TODO: Tags는 Tag[] 형태로 들어옵니다. => 따로 처리해주세요.
  }, []);

  return <PostForm onPost={handlePost} />;
};

export default Post;
