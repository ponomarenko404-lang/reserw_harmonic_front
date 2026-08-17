"use client";

import EmptyState from "@/components/common/EmptyState/EmptyState";
import ArticlesItem from "@/components/articles/ArticlesItem/ArticlesItem";
import { useSavedArticles } from "@/lib/query/useSavedArticles";
import styles from "./SavedArticles.module.css";

export default function SavedArticles() {
  const { data, isLoading, isError } = useSavedArticles(12);

  const articles = data?.pages.flatMap((page) => page.articles) ?? [];

  if (isLoading) {
    return (
      <section className={styles.section}>
        <h2>Saved articles</h2>
        <p>Loading...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles.section}>
        <h2>Saved articles</h2>
        <p>Failed to load saved articles.</p>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className={styles.section}>
        <h2>Saved articles</h2>
        <EmptyState
          title="No saved articles"
          description="Articles you save will appear here."
        />
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2>Saved articles</h2>

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
