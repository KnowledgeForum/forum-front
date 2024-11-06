import { Box, Skeleton } from "@mui/material";

import { TagPopular, TagWithCount } from "@/types/tag";

import AsideLayout from "@/layouts/Aside/AsideLayout";

import Link from "@/components/SubNavigation/Link/Link";

import { getTagTheme } from "@/utils/tag";

type TagNavigationProps = {
  tags?: TagPopular;
  isLoading: boolean;
};

const TagNavigation = ({ tags, isLoading }: TagNavigationProps) => {
  return (
    <AsideLayout>
      {isLoading ? (
        <Box display={"flex"} flexDirection={"column"} gap={"1.25rem"}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Box display={"flex"} alignItems={"center"} gap={"0.3125rem"} key={index}>
                <Skeleton variant="rounded" width={"2.375rem"} height={"2.375rem"} />
                <Box width={"100%"}>
                  <Skeleton variant="text" width={"3.75rem"} />
                  <Skeleton variant="text" width={"100%"} />
                </Box>
              </Box>
            ))}
        </Box>
      ) : (
        <nav>
          <ul>
            {tags?.tags.map((tag: TagWithCount) => {
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
      )}
    </AsideLayout>
  );
};

export default TagNavigation;
