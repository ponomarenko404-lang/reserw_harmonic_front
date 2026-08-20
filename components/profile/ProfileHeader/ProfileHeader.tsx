"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSavedArticles } from "@/lib/query/useSavedArticles";
import { useUserArticles } from "@/lib/query/useUserArticles";
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
  const userArticlesQuery = useUserArticles(user?._id ?? "");
  const savedArticlesQuery = useSavedArticles();

  const [isUploading, setIsUploading] = useState(false);

  const avatarUrlFromUser = user?.avatarUrl ?? avatarUrl;
  const avatar =
    avatarUrlFromUser && avatarUrlFromUser !== "https://goit.global"
      ? avatarUrlFromUser
      : undefined;
  const ownArticlesCount =
    userArticlesQuery.data?.pages[0]?.pagination.totalItems;
  const savedArticlesCount =
    savedArticlesQuery.data?.pages[0]?.pagination.totalItems;
  const articlesCount =
    ownArticlesCount !== undefined && savedArticlesCount !== undefined
      ? ownArticlesCount + savedArticlesCount
      : (user?.articlesCount ?? 0);

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

      if (user && updatedUser?.avatarUrl) {
        setUser({
          ...user,
          avatarUrl: updatedUser.avatarUrl,
        });
      } else {
        throw new Error("The server did not return the uploaded photo");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update avatar",
      );
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
          <Image src={avatar} alt="User avatar" fill sizes="136px" />
        ) : (
          <span>{isUploading ? "..." : "User avatar"}</span>
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
        <p>{articlesCount} articles</p>
      </div>
    </section>
  );
}
