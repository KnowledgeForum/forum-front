import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useMutation } from "@tanstack/react-query";

import LikeActiveIcon from "@assets/like-active.svg";
import LikeNoneIcon from "@assets/like-none.svg";

import classes from "./LikeButton.module.scss";

import { BoardApi } from "@/api/board";

import useToast from "@/hooks/useToast";

type LikeButtonProps = {
  boardId: number;
  isLikeProp: boolean;
};

const LikeButton = ({ boardId, isLikeProp }: LikeButtonProps) => {
  const { ToastElement, showToast } = useToast();

  const [isLike, setIsLike] = useState<boolean>(isLikeProp);

  const { mutate: mutateLike } = useMutation({
    mutationFn: async () => {
      await BoardApi.likeBoard(boardId);
    },
    onSuccess: () => {
      setIsLike(true);
    },
    onError: () => {
      showToast.error("좋아요에 실패했습니다.\n잠시 후 다시 시도해주세요.");
    },
  });

  const { mutate: mutateUnlike } = useMutation({
    mutationFn: async () => {
      await BoardApi.unLikeBoard(boardId);
    },
    onSuccess: () => {
      setIsLike(false);
    },
    onError: () => {
      showToast.error("좋아요 취소에 실패했습니다.\n잠시 후 다시 시도해주세요.");
    },
  });

  const handleLike = useDebouncedCallback(
    useCallback(async () => {
      if (isLike) {
        mutateUnlike();
      } else {
        mutateLike();
      }
    }, [isLike, mutateLike, mutateUnlike]),
    500,
  );

  return (
    <>
      {ToastElement}
      <button
        className={classes.like}
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          event.stopPropagation();
          event.preventDefault();
          handleLike();
        }}
      >
        {isLike ? (
          <img src={LikeActiveIcon} alt="좋아요 아이콘" width={20} height={20} />
        ) : (
          <img src={LikeNoneIcon} alt="좋아요 아이콘" width={20} height={20} />
        )}
      </button>
    </>
  );
};

export default LikeButton;
