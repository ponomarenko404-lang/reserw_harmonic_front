export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthUser = {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  articlesAmount?: number;
  savedArticles?: string[];
  createdAt?: string;
  updatedAt?: string;
};
export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type RegisterResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
};
