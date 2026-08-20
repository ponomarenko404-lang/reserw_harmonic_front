import type { ReactNode } from "react";
import Container from "@/components/common/Container/Container";
import styles from "./layout.module.css";

type ProfileLayoutProps = {
  children: ReactNode;
  myArticles: ReactNode;
  savedArticles: ReactNode;
};

export default function ProfileLayout({
  children,
  myArticles,
  savedArticles,
}: ProfileLayoutProps) {
  return (
    <>
      {children}
      <section className={styles.articles}>
        <Container>
          {myArticles}
          {savedArticles}
        </Container>
      </section>
    </>
  );
}
