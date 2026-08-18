"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import AddArticleForm from "@/components/articles/AddArticleForm/AddArticleForm";
import Container from "@/components/common/Container/Container";
import { useAuthStore } from "@/store/authStore";

import styles from "./page.module.css";

export default function CreateArticlePage() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login?redirect=/articles/create");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className={styles.page}>
      <section className={styles.main}>
        <Container>
          <h1 className={styles.title}>Create an article</h1>
          <AddArticleForm />
        </Container>
      </section>
    </div>
  );
}
