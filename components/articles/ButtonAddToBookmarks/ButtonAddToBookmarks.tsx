"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader/Loader";
import {
  addArticleToBookmarks,
  ArticlesApiError,
  removeArticleFromBookmarks,
} from "@/lib/api/articles";
import ModalErrorSave from "../ModalErrorSave/ModalErrorSave";
import styles from "./ButtonAddToBookmarks.module.css";
import { useAuthStore } from "@/store/authStore";

type ButtonAddToBookmarksProps = {
  articleId: string;
  showLabel?: boolean;
  fullWidth?: boolean;
};

export default function ButtonAddToBookmarks({
  articleId,
  showLabel = false,
  fullWidth = false,
}: ButtonAddToBookmarksProps) {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  // const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser);
  const setArticleSaved = useAuthStore((state) => state.setArticleSaved);
  const isSaved =
    user?.savedArticles?.some(
      (savedArticleId) => String(savedArticleId) === articleId,
    ) ?? false;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleSave = async () => {
    if (isLoading) return;

    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      setIsLoading(true);

      // if (isSaved) {
      //   await removeArticleFromBookmarks(articleId);
      //   await fetchCurrentUser();
      //   toast.success("Article removed from saved articles");
      // } else {
      //   await addArticleToBookmarks(articleId);
      //   await fetchCurrentUser();
      //   toast.success("Article saved");
      // }
      if (isSaved) {
        await removeArticleFromBookmarks(articleId);
        setArticleSaved(articleId, false);
        toast.success("Article removed from saved articles");
      } else {
        await addArticleToBookmarks(articleId);
        setArticleSaved(articleId, true);
        toast.success("Article saved");
      }
    } catch (error) {
      if (error instanceof ArticlesApiError) {
        if (error.status === 401) {
          setIsLoginModalOpen(true);
          return;
        }

        // if (error.status === 409) {
        //   await fetchCurrentUser();
        //   return;
        // }

        // if (error.status === 404 && isSaved) {
        //   await fetchCurrentUser();
        //   return;
        // }
        if (error.status === 409) {
          setArticleSaved(articleId, true);
          return;
        }

        if (error.status === 404 && isSaved) {
          setArticleSaved(articleId, false);
          return;
        }
      }

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update saved article",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className={`${styles.button} ${isSaved ? styles.saved : ""} ${
          fullWidth ? styles.fullWidth : ""
        }`}
        type="button"
        aria-label={isSaved ? "Remove article from saved" : "Save article"}
        aria-pressed={isSaved}
        disabled={isLoading}
        onClick={handleSave}
      >
        {showLabel && <span>{isSaved ? "Saved" : "Save"}</span>}

        {isLoading ? (
          <span className={styles.loader}>
            <Loader
              fullScreen={false}
              label={isSaved ? "Removing article" : "Saving article"}
            />
          </span>
        ) : (
          <svg className={styles.icon} aria-hidden="true">
            <use href="/icons/sprite.svg#icon-bookmark" />
          </svg>
        )}
      </button>

      <ModalErrorSave
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
