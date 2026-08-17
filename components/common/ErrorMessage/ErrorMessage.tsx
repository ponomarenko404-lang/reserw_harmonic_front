import styles from "./ErrorMessage.module.css";

type ErrorMessageProps = { message?: string };

export default function ErrorMessage({ message = "Something went wrong." }: ErrorMessageProps) {
  return <p className={styles.message} role="alert">{message}</p>;
}
