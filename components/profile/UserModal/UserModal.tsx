"use client";

import Modal from "@/components/common/Modal/Modal";

type UserModalProps = { isOpen: boolean; onClose: () => void };

export default function UserModal({ isOpen, onClose }: UserModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Update profile">
      <p>Profile editing form</p>
    </Modal>
  );
}
