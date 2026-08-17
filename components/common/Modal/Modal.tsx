"use client";

import type { MouseEvent, ReactNode } from "react";
import { useEffect, useId, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

const emptySubscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  ariaLabel: string;
  contentClassName?: string;
};

export default function Modal({
  children,
  isOpen,
  onClose,
  ariaLabel,
  contentClassName = "",
}: ModalProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const modalId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isMounted || !isOpen) return null;

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div className={css.backdrop} onMouseDown={handleBackdropClick}>
      <div
        id={modalId}
        className={`${css.modal} ${contentClassName}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
      >
        <button
          className={css.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Закрити модальне вікно"
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
