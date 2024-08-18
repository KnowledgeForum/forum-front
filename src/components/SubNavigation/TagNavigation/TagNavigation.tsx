import { Box, Skeleton } from "@mui/material";

import { TagPopular } from "@/types/tag";

import AsideLayout from "@/layouts/Aside/AsideLayout";

import Link from "@/components/SubNavigation/Link/Link";

import { getTagTheme } from "@/utils/tag";

type TagNavigationProps = {
  tags: TagPopular[];
  isLoading: boolean;
};

const TagNavigation = ({ tags, isLoading }: TagNavigationProps) => {
  return (
    <AsideLayout>
      {isLoading ? (
        <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Box display={"flex"} alignItems={"center"} gap={"5px"} key={index}>
                <Skeleton variant="rounded" width={38} height={38} />
                <Box width={"100%"}>
                  <Skeleton variant="text" width={60} />
                  <Skeleton variant="text" width={"100%"} />
                </Box>
              </Box>
            ))}
        </Box>
      ) : (
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
      )}
    </AsideLayout>
  );
};

export default TagNavigation;
