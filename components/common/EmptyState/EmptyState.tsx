import styles from "./EmptyState.module.css";
import Link from "next/link";

type EmptyStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
};

export default function EmptyState({
  title = "Nothing here yet",
  description = "New content will appear here.",
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className={styles.state}>
      <span className={styles.icon} aria-hidden="true">
        !
      </span>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {actionLabel && actionHref ? (
        <Link className={styles.action} href={actionHref}>
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
