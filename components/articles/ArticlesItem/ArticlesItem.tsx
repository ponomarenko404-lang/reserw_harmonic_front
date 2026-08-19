import Image from "next/image";
import Link from "next/link";
import ButtonAddToBookmarks from "../ButtonAddToBookmarks/ButtonAddToBookmarks";
import styles from "./ArticlesItem.module.css";

type ArticleItemData = {
  _id: string;
  img?: string;
  title: string;
  desc: string;
  author?: string | null;
};

type ArticlesItemProps = {
  article: ArticleItemData;
};

export default function ArticlesItem({ article }: ArticlesItemProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {article.img ? (
          <Image
            className={styles.image}
            src={article.img}
            alt={article.title}
            fill
            sizes="(max-width: 767px) 50vw, (max-width: 1439px) 33vw, 33vw"
          />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>

      <div className={styles.textContent}>
        {article.author && (
        <p className={styles.author}>
          {article.author.split(" ")[0]}
        </p>
      )}

        <h3 className={styles.title}>{article.title}</h3>

        <p className={styles.description}>{article.desc}</p>
      </div>

      <div className={styles.actions}>
        <Link className={styles.learnMore} href={`/articles/${article._id}`}>
          Learn more
        </Link>

        <ButtonAddToBookmarks articleId={article._id} />
      </div>
    </article>
  );
}