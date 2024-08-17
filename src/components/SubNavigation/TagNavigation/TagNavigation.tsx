import { TagPopular } from "@/types/tag";

import AsideLayout from "@/layouts/Aside/AsideLayout";

import Link from "@/components/SubNavigation/Link/Link";

import { getTagTheme } from "@/utils/tag";

type TagNavigationProps = {
  tags: TagPopular[];
};

const TagNavigation = ({ tags }: TagNavigationProps) => {
  return (
    <AsideLayout>
      <nav>
        <ul>
          {tags.map((tag: TagPopular) => {
            const theme = getTagTheme(tag);

            return (
              <li key={tag.tagId}>
                <Link
                  data={{
                    to: `/tag?tagName=${tag.tagName}`,
                    icon: theme.icon,
                    title: `#${tag.tagName}`,
                    description: `${tag.tagCount}개의 게시글이 있습니다.`,
                  }}
                  color={theme.color}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    </AsideLayout>
  );
};

export default TagNavigation;
