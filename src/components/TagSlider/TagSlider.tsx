import { Tag } from "@/types/tag";

import classes from "./TagSlider.module.scss";

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

type TagSliderProps = {
  tags: Tag[];
};

const TagSlider = ({ tags }: TagSliderProps) => {
  const navigate = useNavigate();

  const moveTag = useCallback(
    (e: MouseEvent, tagName: string) => {
      e.stopPropagation();
      e.preventDefault();
      navigate(`/tag?tagName=${tagName}`);
    },
    [navigate],
  );

  return (
    <div
      className={classes.tagBox}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      <ul className={classes.tag}>
        {tags.map((tag) => (
          <li key={tag.tagId} className={classes.item}>
            <span
              onClick={(event: React.MouseEvent<HTMLSpanElement>) =>
                moveTag(event as unknown as MouseEvent, tag.tagName)
              }
            >
              #{tag.tagName}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagSlider;
