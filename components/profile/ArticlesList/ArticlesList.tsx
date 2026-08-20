"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import ArticlesItem from "@/components/articles/ArticlesItem/ArticlesItem";
import Button from "@/components/common/Button/Button";
import EmptyState from "@/components/common/EmptyState/EmptyState";
import Loader from "@/components/common/Loader/Loader";
import { useSavedArticles } from "@/lib/query/useSavedArticles";
import { useUserArticles } from "@/lib/query/useUserArticles";
import { useAuthStore } from "@/store/authStore";
import styles from "./ArticlesList.module.css";

const ARTICLES_PER_PAGE = 12;

type ArticlesListProps = {
  source: "my" | "saved";
};

export default function ArticlesList({ source }: ArticlesListProps) {
  const userId = useAuthStore((state) => state.user?._id ?? "");
  const listRef = useRef<HTMLUListElement>(null);
  const userArticlesQuery = useUserArticles(userId, ARTICLES_PER_PAGE);
  const savedArticlesQuery = useSavedArticles(ARTICLES_PER_PAGE);
  const query = source === "my" ? userArticlesQuery : savedArticlesQuery;
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
  } = query;

  useEffect(() => {
    if (isError) {
      toast.error(
        error instanceof Error ? error.message : "Failed to load articles",
      );
    }
  }, [error, isError]);

  if (isLoading) {
    return <Loader fullScreen={false} label="Loading articles" />;
  }

  if (isError) {
    return null;
  }

  const articles = data?.pages.flatMap((page) => page.articles) ?? [];

  if (articles.length === 0) {
    return (
      <EmptyState
        title="Nothing found."
        description={
          source === "my"
            ? "Write your first article"
            : "Save your first article"
        }
        actionLabel={source === "my" ? "Create an article" : "Go to articles"}
        actionHref={source === "my" ? "/articles/create" : "/articles"}
      />
    );
  }

  const loadMore = async () => {
    const result = await fetchNextPage();

    if (result.isSuccess) {
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <ul ref={listRef} className={styles.list}>
        {articles.map((article) => (
          <li key={article._id}>
            <ArticlesItem article={article} />
          </li>
        ))}
      </ul>

      {hasNextPage ? (
        <Button
          variant="fill"
          size="lg"
          className={styles.loadMore}
          onClick={loadMore}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      ) : null}
    </>
  );
}
