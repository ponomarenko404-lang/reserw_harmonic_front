import Container from "@/components/common/Container/Container";
import ArticlesItem from "@/components/articles/ArticlesItem/ArticlesItem";
import { getPopularArticles } from "@/lib/api/articles";
import Link from "next/link";
import styles from "./PopularArticles.module.css";

export default async function PopularArticles() {
  const articles = await getPopularArticles();
  return (
    <section className={styles.section} id="popular-articles">
      <Container>
        <div className={styles.heading}>
          <h2 className={styles.title}>Popular Articles</h2>

          <Link className={styles.link} href="/articles">
            Go to all Articles
            <svg className={styles.arrow} aria-hidden="true">
              <use href="/icons/sprite.svg#icon-right-arrow-up" />
            </svg>
          </Link>
        </div>

        <ul className={styles.list}>
          {articles.map((article, index) => (
            <li
              key={article._id}
              className={index === 3 ? styles.fourthCard : undefined}
            >
              <ArticlesItem article={article} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
