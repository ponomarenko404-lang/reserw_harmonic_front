import Link from "next/link";
import ButtonAddToBookmarks from "../ButtonAddToBookmarks/ButtonAddToBookmarks";
import { getArticles } from "@/lib/api/articles";
import type { ArticleDetails } from "@/types/article";
import styles from "./ArticleRecommendations.module.css";

type ArticleRecommendationsProps = {
  article: ArticleDetails;
};

export default async function ArticleRecommendations({
  article,
}: ArticleRecommendationsProps) {
  const response = await getArticles({
    page: 1,
    perPage: 4,
  });

  const recommendations = response.data
    .filter((item) => item._id !== article._id)
    .slice(0, 3);

  const parsedDate = article.date ? new Date(article.date) : null;

  const publicationDate =
    parsedDate && !Number.isNaN(parsedDate.getTime())
      ? new Intl.DateTimeFormat("uk-UA").format(parsedDate)
      : "";

  return (
    <section className={styles.section}>
      <div className={styles.panel}>
        <p className={styles.info}>
          <strong>Author:</strong>{" "}
          {article.owner ? (
            <Link
              className={styles.authorLink}
              href={`/authors/${article.owner._id}`}
            >
              {article.owner.name}
            </Link>
          ) : (
            "Автор невідомий"
          )}
        </p>

        <p className={styles.info}>
          <strong>Publication date:</strong> {publicationDate}
        </p>

        <h2 className={styles.title}>You can also interested</h2>

        <ul className={styles.list}>
          {recommendations.map((recommendation) => (
            <li key={recommendation._id}>
              <Link
                className={styles.card}
                href={`/articles/${recommendation._id}`}
              >
                <span className={styles.cardText}>
                  <strong className={styles.cardTitle}>
                    {recommendation.title}
                  </strong>

                  <span className={styles.cardAuthor}>
  {recommendation.owner?.name || recommendation.author || "Автор невідомий"}
</span>
                </span>

                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <ButtonAddToBookmarks articleId={article._id} showLabel fullWidth />
    </section>
  );
}
