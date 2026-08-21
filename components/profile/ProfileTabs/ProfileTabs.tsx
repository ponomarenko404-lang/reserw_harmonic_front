"use client";

import Link from "next/link";
import { useSavedArticles } from "@/lib/query/useSavedArticles";
import { useUserArticles } from "@/lib/query/useUserArticles";
import { useAuthStore } from "@/store/authStore";
import styles from "./ProfileTabs.module.css";

type ProfileTabsProps = { activeTab: "saved" | "my-articles" };

export default function ProfileTabs({ activeTab }: ProfileTabsProps) {
  const userId = useAuthStore((state) => state.user?._id ?? "");
  const userArticlesQuery = useUserArticles(userId);
  const savedArticlesQuery = useSavedArticles();
  const myArticlesCount =
    userArticlesQuery.data?.pages[0]?.pagination.totalItems;
  const savedArticlesCount =
    savedArticlesQuery.data?.pages[0]?.pagination.totalItems;

  return (
    <nav className={styles.tabs} aria-label="Profile sections">
      <Link
        className={activeTab === "my-articles" ? styles.active : ""}
        href="/profile?tab=my-articles"
      >
        My Articles {myArticlesCount !== undefined && `(${myArticlesCount})`}
      </Link>
      <Link
        className={activeTab === "saved" ? styles.active : ""}
        href="/profile?tab=saved"
      >
        Saved Articles{" "}
        {savedArticlesCount !== undefined && `(${savedArticlesCount})`}
      </Link>
    </nav>
  );
}
