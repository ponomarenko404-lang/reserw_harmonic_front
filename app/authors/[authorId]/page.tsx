import AuthorArticlesList from "@/components/authors/AuthorArticlesList/AuthorArticlesList";
import AuthorInfo from "@/components/authors/AuthorInfo/AuthorInfo";
import Container from "@/components/common/Container/Container";
import styles from "./page.module.css";

export default async function AuthorPage({
  params,
}: PageProps<"/authors/[authorId]">) {
  const { authorId } = await params;

  return (
    <div className={styles.page}>
      <section className={styles.main}>
        <Container>
          <AuthorInfo authorId={authorId} />
          <AuthorArticlesList authorId={authorId} />
        </Container>
      </section>
    </div>
  );
}
