import { TagPopular } from "@/types/tag";

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
};
