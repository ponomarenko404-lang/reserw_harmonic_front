import styles from "./EmptyState.module.css";

type EmptyStateProps = { title?: string; description?: string };

export default function EmptyState({ title = "Nothing here yet", description = "New content will appear here." }: EmptyStateProps) {
  return <div className={styles.state}><h2>{title}</h2><p>{description}</p></div>;
}
