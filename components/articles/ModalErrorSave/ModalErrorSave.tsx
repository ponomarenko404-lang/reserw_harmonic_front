"use client";

import Link from "next/link";
import Modal from "@/components/common/Modal/Modal";
import css from "./ModalErrorSave.module.css";

type ModalErrorSaveProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalErrorSave({
  isOpen,
  onClose,
}: ModalErrorSaveProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="Помилка збереження статті"
    >
      <div className={css.content}>
        <h2 className={css.title}>Error while saving</h2>
        <p className={css.description}>
        To save this article, you need to <br />
        authorize first
      </p>

      <div className={css.actions}>
        <Link className={css.primaryLink} href="/login" onClick={onClose}>
          Login
        </Link>
        <Link
          className={css.secondaryLink}
          href="/register"
          onClick={onClose}
        >
          Register
        </Link>
      </div>
      </div>
    </Modal>
  );
}