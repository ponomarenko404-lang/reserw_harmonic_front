"use client";
import { useSearchParams, useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";
import { useAuthors } from "@/lib/query/useAuthors";
import AuthorsList from "@/components/authors/AuthorsList/AuthorsList";
import Container from "@/components/common/Container/Container";
import Loader from "@/components/common/Loader/Loader";
import styles from "./page.module.css";
export default function AuthorsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isLoading, isFetching, isError, error } = useAuthors(page);
  if (isError) {
    return (
      <div className={styles.page}>
        {" "}
        <Container className={styles.customContainer}>
          {" "}
          <p className={styles.error}> Error: {error?.message} </p>{" "}
        </Container>{" "}
      </div>
    );
  }
  const authors = data?.authors ?? [];
  const totalPages = data?.pagination?.totalPages ?? 0;
  const handlePageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    router.push(`/authors?page=${newPage}`);
  };
  return (
    <div className={styles.page}>
      {" "}
      <section className={styles.main}>
        {" "}
        <Container className={styles.container}>
          {" "}
          <h1 className={styles.title}>Authors</h1>{" "}
          {isLoading ? (
            <Loader fullScreen={false} label="Loading authors..." />
          ) : (
            <AuthorsList authors={authors} />
          )}{" "}
          {isFetching && !isLoading && (
            <Loader fullScreen={false} label="Loading authors..." />
          )}{" "}
          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              forcePage={page - 1}
              onPageChange={handlePageChange}
              previousLabel="←"
              nextLabel="→"
              breakLabel="..."
              containerClassName={styles.pagination}
              pageClassName={styles.pageItem}
              previousClassName={styles.previous}
              nextClassName={styles.next}
              activeClassName={styles.active}
              disabledClassName={styles.disabled}
            />
          )}{" "}
        </Container>{" "}
      </section>{" "}
    </div>
  );
}
