"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { updateAvatar } from "@/lib/api/users";
import styles from "./ProfileHeader.module.css";

type ProfileHeaderProps = {
  name?: string;
  avatarUrl?: string;
};

export default function ProfileHeader({
  name = "User name",
  avatarUrl,
}: ProfileHeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  const [isUploading, setIsUploading] = useState(false);

  const avatar = user?.avatarUrl ?? avatarUrl;

  const handleAvatarClick = () => {
    inputRef.current?.click();
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setIsUploading(true);

      const updatedUser = await updateAvatar(file);

      if (user) {
        setUser({
          ...user,
          avatarUrl: updatedUser.avatarUrl,
        });
      }
    } catch (error) {
      console.error("Failed to update avatar:", error);
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <section className={styles.header}>
      <button
        type="button"
        className={styles.avatar}
        onClick={handleAvatarClick}
        disabled={isUploading}
        aria-label="Change avatar"
      >
        {avatar ? (
          <Image src={avatar} alt={`${name} avatar`} fill sizes="124px" />
        ) : (
          <span>{isUploading ? "..." : "+"}</span>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        hidden
      />

      <div>
        <h2>{user?.name ?? name}</h2>
        <p>{user?.articlesCount ?? 0} articles</p>
      </div>
    </section>
  );
}
