import { notFound } from "next/navigation";
import AddArticleForm from "@/components/articles/AddArticleForm/AddArticleForm";
import Container from "@/components/common/Container/Container";
import { getArticleById } from "@/lib/api/articles";
import styles from "./page.module.css";

type EditArticlePageProps = {
  params: Promise<{ articleId: string }>;
};

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const { articleId } = await params;
  const article = await getArticleById(articleId).catch(() => null);

  if (!article) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <section className={styles.main}>
        <Container>
          <h1 className={styles.title}>Edit article</h1>
          <p className={styles.articleId}>Article ID: {articleId}</p>
          <AddArticleForm initialArticle={article} />
        </Container>
      </section>
    </div>
  );
}
