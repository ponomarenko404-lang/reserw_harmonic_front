import type { ReactNode } from "react";
import Image from "next/image";
import type { ArticleDetails as ArticleDetailsType } from "@/types/article";
import styles from "./ArticleDetails.module.css";

type ArticleDetailsProps = {
  article: ArticleDetailsType;
  sidebar: ReactNode;
};

export default function ArticleDetails({
  article,
  sidebar,
}: ArticleDetailsProps) {
  const content = article.article.replaceAll("/n", "\n");

  return (
    <article className={styles.article}>
      <h1 className={styles.title}>{article.title}</h1>

      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={article.img}
          alt={article.title}
          fill
          priority
          sizes="(max-width: 767px) 100vw, 1225px"
        />
      </div>

      <div className={styles.layout}>
        <div className={styles.content}>
          {content.split("\n").map((paragraph, index) => {
            const text = paragraph.trim();

            if (!text) return null;

            return <p key={`${index}-${text.slice(0, 20)}`}>{text}</p>;
          })}
        </div>

        <aside className={styles.sidebar}>{sidebar}</aside>
      </div>
    </article>
  );
}
