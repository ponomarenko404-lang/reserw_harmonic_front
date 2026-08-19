import type { IAuthor } from "@/types/author";
import AuthorsItem from "../AuthorsItem/AuthorsItem";
import styles from "./AuthorsList.module.css";

interface AuthorsListProps {
  authors?: IAuthor[];
}

export default function AuthorsList({ authors = [] }: AuthorsListProps) {
  if (authors.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyText}>
          No authors found. The creators list is currently empty.
        </p>
      </div>
    );
  }

  return (
    <ul className={styles.list} role="list">
      {authors.map((author) => (
        <li key={author.id} className={styles.item}>
          <AuthorsItem author={author} />
        </li>
      ))}
    </ul>
  );
}
