import styles from "./Loader.module.css";

type LoaderProps = {
  fullScreen?: boolean;
  label?: string;
};

export default function Loader({
  fullScreen = true,
  label = "Loading",
}: LoaderProps) {
  return (
    <div
      className={fullScreen ? styles.fullScreen : styles.inline}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.visuallyHidden}>{label}</span>
    </div>
  );
}
