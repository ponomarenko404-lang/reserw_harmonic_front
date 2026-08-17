"use client";

import Modal from "@/components/common/Modal/Modal";
import css from "./LogoutModal.module.css";

type LogoutModalProps = {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function LogoutModal({
  isOpen,
  isLoading = false,
  onClose,
  onConfirm,
}: LogoutModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="Logout confirmation"
      contentClassName={css.logoutModal}
    >
      <div className={css.content}>
        <h2 className={css.title}>Are you sure?</h2>
        <p className={css.description}>We will miss you!</p>
        <div className={css.actions}>
          <button
            className={css.primaryButton}
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Log out"}
          </button>
          <button
            className={css.secondaryButton}
            type="button"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
