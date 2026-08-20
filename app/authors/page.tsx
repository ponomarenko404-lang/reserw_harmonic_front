"use client";

import { useInfiniteAuthors } from "@/lib/query/useAuthors";
import AuthorsList from "@/components/authors/AuthorsList/AuthorsList";
import Container from "@/components/common/Container/Container";
import Loader from "@/components/common/Loader/Loader";
import styles from "./page.module.css";

export default function AuthorsPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteAuthors();

  const allAuthors = data?.pages.flatMap((page) => page.data) || [];

  if (isError) {
    return (
      <div className={styles.page}>
        <Container className={styles.customContainer}>
          <p className={styles.error}>Error: {error?.message}</p>
        </Container>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <section className={styles.main}>
        {/* Додано className для коректних падінгів за макетом */}
        <Container className={styles.container}>
          <h1 className={styles.title}>Authors</h1>

          <AuthorsList authors={allAuthors} />

          {(isLoading || isFetchingNextPage) && (
            <Loader fullScreen={isLoading} label="Loading authors..." />
          )}

          {hasNextPage && !isLoading && (
            <div className={styles.loadMoreWrapper}>
              <button
                type="button"
                onClick={() => fetchNextPage()}
                className={styles.loadMoreBtn}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
