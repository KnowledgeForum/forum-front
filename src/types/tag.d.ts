export type Tag = {
  tagId: number;
  tagName: string;
};

export type TagWithCount = {
  tagCount: number;
} & Tag;

export type TagPopular = {
  tags: TagWithCount[];
};

export type TagSearch = {
  tags: Tag[];
};
