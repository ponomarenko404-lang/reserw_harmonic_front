import AddArticleForm from "@/components/articles/AddArticleForm/AddArticleForm";
import Container from "@/components/common/Container/Container";
import styles from "./page.module.css";

export default function CreateArticlePage() {
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
