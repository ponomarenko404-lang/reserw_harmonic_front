"use client";

import EmptyState from "@/components/common/EmptyState/EmptyState";
import ArticlesItem from "@/components/articles/ArticlesItem/ArticlesItem";
import { useAuthStore } from "@/store/authStore";
import { useUserArticles } from "@/lib/query/useUserArticles";
import styles from "./MyArticles.module.css";

export default function MyArticles() {
  const user = useAuthStore((state) => state.user);

  const { data, isLoading, isError } = useUserArticles(user?._id ?? "", 12);

  const articles = data?.pages.flatMap((page) => page.articles) ?? [];

  if (isLoading) {
    return (
      <section className={styles.section}>
        <p>Loading...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles.section}>
        <p>Failed to load articles.</p>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className={styles.section}>
        <EmptyState
          title="Nothing found."
          description="Write your first article"
          actionLabel="Create an article"
          actionHref="/articles/create"
        />
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2>My articles</h2>

      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <ArticlesItem
              article={{
                _id: article._id,
                img: article.img,
                title: article.title,
                desc: article.desc,
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
