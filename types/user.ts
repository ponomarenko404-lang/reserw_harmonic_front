export type User = {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  articlesCount?: number;
  savedArticles?: string[];
  createdAt?: string;
  updatedAt?: string;
};
