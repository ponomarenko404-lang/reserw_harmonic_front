// export type Article = {
//   _id: string;
//   img: string;
//   title: string;
//   desc: string;
//   article: string;
//   rate: number;
//   ownerId: string;
//   date: string;
// };
export type Category = "popular" | "general";

export type ArticleOwner =
  | string
  | null
  | {
      _id: string;
      name: string;
      avatarUrl?: string;
    };

export type Article = {
  _id: string;
  photo: string;
  title: string;
  description: string;
  content?: string;
  rate?: number;
  ownerId: string | null;
  date: string;
  author?: string | null;
  category: Category;
  owner?: {
    _id: string;
    name: string;
    avatarUrl?: string;
  } | null;
};

export type ArticlesResponse = {
  data: Article[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

export type GetArticlesParams = {
  page?: number;
  perPage?: number;
  category?: "popular" | "all";
  sortBy?: "date" | "rate" | "title";
  sortOrder?: "asc" | "desc";
};

export type UserArticle = {
  _id: string;
  img: string;
  title: string;
  desc: string;
  article: string;
  rate: number;
  ownerId: string;
  date: string;
};

export type UserArticlesResponse = {
  articles: UserArticle[];
  pagination: {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export type ArticleDetails = {
  _id: string;
  img: string;
  title: string;
  desc: string;
  article: string;
  rate: number;
  date: string;
  category: Category;
  owner: {
    _id: string;
    name: string;
    avatarUrl?: string;
  } | null;
};
