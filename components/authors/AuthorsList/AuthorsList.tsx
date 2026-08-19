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
      {authors.map((author, index) => ( // 1. Додаємо index сюди
        <li key={author.id} className={styles.item}>
          {/* 2. Передаємо index у компонент картки авторів */}
          <AuthorsItem author={author} index={index} /> 
        </li>
      ))}
    </ul>
  );
}
