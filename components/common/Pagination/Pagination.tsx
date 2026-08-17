import styles from "./Pagination.module.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  disabled?: boolean;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  disabled = false,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        onClick={onPrevious}
        disabled={disabled || currentPage === 1}
      >
        Previous
      </button>

      <span>
        {currentPage} / {totalPages}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={disabled || currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  );
}
