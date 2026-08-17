import Link from "next/link";
import styles from "./error.module.css";

export default function NotFoundPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.code}>404</p>

        <h1 className={styles.title}>Page not found</h1>

        <p className={styles.description}>
          The page you are looking for does not exist or has been moved.
        </p>

        <div className={styles.actions}>
          <Link className={styles.homeLink} href="/">
            Go to home
          </Link>

          <Link className={styles.homeLink} href="/articles">
            View articles
          </Link>
        </div>
      </div>
    </main>
  );
}
