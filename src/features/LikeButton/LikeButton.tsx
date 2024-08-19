import LikeActiveIcon from "@assets/like-active.svg";
import LikeNoneIcon from "@assets/like-none.svg";

import classes from "./LikeButton.module.scss";
import { useDebouncedCallback } from "use-debounce";
import { useCallback, useState } from "react";

type LikeButtonProps = {
  boardId: number;
  isLikeProp: boolean;
};

const LikeButton = ({ boardId, isLikeProp }: LikeButtonProps) => {
  const [isLike, setIsLike] = useState<boolean>(isLikeProp);

  const handleLike = useDebouncedCallback(
    useCallback(() => {
      console.log("Board Id : ", boardId);

      if (isLike) {
        // TODO: 좋아요 취소 API 호출
        setIsLike(false);
      } else {
        // TODO: 좋아요 API 호출
        setIsLike(true);
      }
    }, [boardId, isLike]),
    500,
  );

  return (
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
  );
};

export default LikeButton;
