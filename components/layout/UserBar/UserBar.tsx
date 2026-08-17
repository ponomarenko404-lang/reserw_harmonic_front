"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import styles from "./UserBar.module.css";

type UserBarProps = {
  onLogoutClick: () => void;
};

export default function UserBar({ onLogoutClick }: UserBarProps) {
  const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser);
  const user = useAuthStore((state) => state.user);

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!user?._id) {
      fetchCurrentUser();
    }
  }, [user?._id, fetchCurrentUser]);

  const name = user?.name || "User";
  const avatarUrl = user?.avatarUrl;
  const firstLetter = name.charAt(0).toUpperCase() || "U";

  return (
    <div className={styles.userBar}>
      <Link href="/profile" className={styles.profileLink}>
        <span className={styles.avatar}>
          {avatarUrl && !imageError ? (
            <Image
              src={avatarUrl}
              alt={name}
              width={32}
              height={32}
              className={styles.avatarImg}
              unoptimized
              onError={() => setImageError(true)}
            />
          ) : (
            <span className={styles.avatarLetter}>{firstLetter}</span>
          )}
        </span>

        <span className={styles.userName}>{name}</span>
      </Link>

      <span className={styles.divider} aria-hidden="true" />

      <button
        type="button"
        onClick={onLogoutClick}
        className={styles.exitBtn}
        aria-label="Exit"
      >
        <svg className={styles.exitIcon}>
          <use href="/icons/sprite.svg#icon-logout" />
        </svg>
      </button>
    </div>
  );
}
