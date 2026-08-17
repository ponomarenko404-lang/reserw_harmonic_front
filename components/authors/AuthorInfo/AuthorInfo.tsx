import { getUserById } from "@/lib/api/users";
import styles from "./AuthorInfo.module.css";
import Image from "next/image";

type AuthorInfoProps = {
  authorId: string;
};

export default async function AuthorInfo({ authorId }: AuthorInfoProps) {
  const data = await getUserById(authorId);

  const author = data.user;

  return (
    <section className={styles.info}>
      {author.avatarUrl && (
        <Image
          className={styles.avatar}
          src={author.avatarUrl}
          alt={author.name}
          width={124}
          height={124}
        />
      )}

      <div className={styles.details}>
        <h1 className={styles.name}>{author.name}</h1>

        <p className={styles.articlesAmount}>
          {author.articlesAmount} articles
        </p>
      </div>
    </section>
  );
}
