import { Tag as TagType } from "@/types/tag";

import classes from "./Tag.module.scss";

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

type TagProps = {
  tags: TagType[];
};

const Tag = ({ tags }: TagProps) => {
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

export default Tag;
