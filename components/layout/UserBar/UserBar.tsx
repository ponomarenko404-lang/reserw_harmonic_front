"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import styles from "./UserBar.module.css";

type UserBarProps = {
  onLogoutClick: () => void;
};

const DEFAULT_AVATAR = "/images/default-avatar.png";

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

  const avatarUrl =
    user?.avatarUrl && user.avatarUrl !== "https://goit.global"
      ? user.avatarUrl
      : DEFAULT_AVATAR;

  return (
    <div className={styles.userBar}>
      <Link href="/profile" className={styles.profileLink}>
        <span className={styles.avatar}>
          {!imageError ? (
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
            <Image
              src={DEFAULT_AVATAR}
              alt={name}
              width={32}
              height={32}
              className={styles.avatarImg}
            />
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