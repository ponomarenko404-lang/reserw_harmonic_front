import ArticlesList from "@/components/articles/ArticlesList/ArticlesList";
import Container from "@/components/common/Container/Container";
import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import styles from "./page.module.css";

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