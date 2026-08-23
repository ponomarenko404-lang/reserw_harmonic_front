"use client";

import { useInfiniteAuthors } from "@/lib/query/useAuthors";
import AuthorsList from "@/components/authors/AuthorsList/AuthorsList";
import Container from "@/components/common/Container/Container";
import Loader from "@/components/common/Loader/Loader";
import styles from "./page.module.css";

export default function AuthorsPageContent() {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
  } = useInfiniteAuthors();

  if (isError) {
    return (
      <div className={styles.page}>
        <Container className={styles.customContainer}>
          <p className={styles.error}>Error: {error?.message}</p>
        </Container>
      </div>
    );
  }

  const authors = Array.from(
    new Map(
      (data?.pages.flatMap((page) => page.authors) ?? []).map((author) => [
        author._id,
        author,
      ]),
    ).values(),
  );

  const sortedAuthors = authors.sort((firstAuthor, secondAuthor) => {
    const firstAuthorArticlesAmount =
      firstAuthor.articles?.length ?? firstAuthor.articlesAmount;
    const secondAuthorArticlesAmount =
      secondAuthor.articles?.length ?? secondAuthor.articlesAmount;

    return secondAuthorArticlesAmount - firstAuthorArticlesAmount;
  });

  const handleLoadMore = () => fetchNextPage();

  return (
    <div className={styles.page}>
      <section className={styles.main}>
        <Container className={styles.container}>
          <h1 className={styles.title}>Authors</h1>

          {isLoading ? (
            <Loader fullScreen={false} label="Loading authors..." />
          ) : (
            <AuthorsList authors={sortedAuthors} />
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
        </Container>
      </section>
    </div>
  );
}
