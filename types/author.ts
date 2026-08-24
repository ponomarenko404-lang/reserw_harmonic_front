import type { Article } from "./article";

export interface IAuthor {
  _id: string;
  name: string;
  avatarUrl: string;
  articlesAmount: number;
  articles?: Article[];
}
