"use client";

import { useRef, useState } from "react";
import ArticlesFilter, {
  type Category,
} from "../ArticlesFilter/ArticlesFilter";
import ArticlesItem from "../ArticlesItem/ArticlesItem";
import Loader from "@/components/common/Loader/Loader";
import { useInfiniteArticles } from "@/hooks/useInfiniteArticles";
import styles from "./ArticlesList.module.css";

const ARTICLES_PER_PAGE = 12;

export default function ArticlesList() {
  const [category, setCategory] = useState<Category>("all");
  const listRef = useRef<HTMLUListElement>(null);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
  } = useInfiniteArticles({
    perPage: ARTICLES_PER_PAGE,
    ...(category !== "all" ? { category } : {}),
  });

  const changeCategory = (value: Category) => {
    setCategory(value);
  };

  if (isLoading) {
    return <Loader fullScreen={false} label="Loading articles" />;
  }

  if (isError) {
    return (
      <p role="alert">
        {error instanceof Error ? error.message : "Failed to load articles"}
      </p>
    );
  }

  const articles = Array.from(
    new Map(
      (data?.pages.flatMap((page) => page.data) ?? []).map((article) => [
        article._id,
        article,
      ]),
    ).values(),
  );

  const handleLoadMore = async () => {
    const previousArticlesCount = articles.length;

    await fetchNextPage();

    requestAnimationFrame(() => {
      const newArticle = listRef.current?.children[previousArticlesCount] as
        | HTMLElement
        | undefined;

      newArticle?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <>
      <div className={styles.toolbar}>
        <p className={styles.count}>
          {data?.pages[0]?.totalItems ?? 0} articles
        </p>

        <ArticlesFilter category={category} onCategoryChange={changeCategory} />
      </div>

      {articles.length === 0 ? (
        <p className={styles.empty}>No articles found.</p>
      ) : (
        <ul ref={listRef} className={styles.list}>
          {articles.map((article) => (
            <li key={article._id}>
              <ArticlesItem article={article} />
            </li>
          ))}
        </ul>
      )}

      {hasNextPage && (
        <button
          type="button"
          className={styles.loadMore}
          onClick={handleLoadMore}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
}
