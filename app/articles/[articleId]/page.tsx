import { notFound } from "next/navigation";
import ArticleDetails from "@/components/articles/ArticleDetails/ArticleDetails";
import Container from "@/components/common/Container/Container";
import { ArticlesApiError, getArticleById } from "@/lib/api/articles";
import styles from "./page.module.css";

type ArticlePageProps = {
  params: Promise<{ articleId: string }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { articleId } = await params;

  let article;

  try {
    article = await getArticleById(articleId);
  } catch (error) {
    if (
      error instanceof ArticlesApiError &&
      (error.status === 400 || error.status === 404)
    ) {
      notFound();
    }

    throw error;
  }

  return (
    <main className={styles.main}>
      <Container>
        <ArticleDetails article={article} sidebar={null} />
      </Container>
    </main>
  );
}
