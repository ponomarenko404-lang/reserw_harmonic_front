import type { Metadata } from "next";
import ArticlesList from "@/components/articles/ArticlesList/ArticlesList";
import Container from "@/components/common/Container/Container";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Articles | Harmoniq",
    description: "Explore articles on Harmoniq.",
    openGraph: {
      title: "Articles | Harmoniq",
      description: "Explore articles on Harmoniq.",
      type: "website",
    },
  };
}

export default function ArticlesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.main}>
        <Container>
          <SectionTitle>Articles</SectionTitle>
          <ArticlesList />
        </Container>
      </section>
    </div>
  );
}