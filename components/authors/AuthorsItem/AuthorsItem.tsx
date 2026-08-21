import Link from "next/link";
import Image from "next/image";
import type { IAuthor } from "@/types/author";
import styles from "./AuthorsItem.module.css";

interface AuthorsItemProps {
  author: IAuthor;
}

export default function AuthorsItem({ author }: AuthorsItemProps) {
  const avatar =
    author.avatarUrl && author.avatarUrl !== "https://goit.global"
      ? author.avatarUrl
      : "/images/default-avatar.png";

  return (
    <Link href={`/authors/${author.id}`} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={avatar}
            alt={`Profile photo of ${author.name}`}
            width={148}
            height={148}
            className={styles.photo}
          />
        </div>

        <h3 className={styles.name}>{author.name}</h3>
      </article>
    </Link>
  );
}