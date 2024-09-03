import { TagPopular, TagSearch } from "@/types/tag";

export const TagApi = {
  fetchPopularTags: async (): Promise<TagPopular> => {
    return {
      tags: [
        {
          tagId: 1,
          tagName: "javascript",
          tagCount: 10,
        },
        {
          tagId: 2,
          tagName: "bitcoin",
          tagCount: 8,
        },
        {
          tagId: 3,
          tagName: "design",
          tagCount: 6,
        },
        {
          tagId: 4,
          tagName: "innovation",
          tagCount: 5,
        },
        {
          tagId: 5,
          tagName: "tutorial",
          tagCount: 3,
        },
        {
          tagId: 6,
          tagName: "test",
          tagCount: 1,
        },
      ],
    };
  },
  fetchSearchTags: async (keyword: string): Promise<TagSearch> => {
    console.log("fetchSearchTags : ", keyword);

    return {
      tags: [
        {
          tagId: 1,
          tagName: "frontend",
        },
        {
          tagId: 2,
          tagName: "fluter",
        },
        {
          tagId: 3,
          tagName: "framework",
        },
        {
          tagId: 4,
          tagName: "firebase",
        },
        {
          tagId: 5,
          tagName: "file",
        },
        {
          tagId: 6,
          tagName: "front-end",
        },
        {
          tagId: 7,
          tagName: "flask",
        },
        {
          tagId: 8,
          tagName: "figma",
        },
        {
          tagId: 9,
          tagName: "form",
        },
        {
          tagId: 10,
          tagName: "frame-expert",
        },
      ],
    };
  },
};
