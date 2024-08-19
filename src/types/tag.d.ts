export type Tag = {
  tagId: number;
  tagName: string;
};

export type TagPopular = {
  tagCount: number;
} & Tag;
