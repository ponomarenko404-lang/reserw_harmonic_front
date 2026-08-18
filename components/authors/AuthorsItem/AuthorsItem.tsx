import Link from 'next/link';
import Image from 'next/image';
import type { IAuthor } from '@/types/author';
import styles from './AuthorsItem.module.css';

interface AuthorsItemProps {
  author: IAuthor;
}

export default function AuthorsItem({ author }: AuthorsItemProps) {
  // Перевіряємо, чи є реальне фото в базі даних (не порожній рядок)
  const hasAvatar = author.avatarUrl && author.avatarUrl !== '';

  return (
    <Link href={`/authors/${author.id}`} className={styles.cardLink}>
      
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          {hasAvatar ? (
            <Image
              src={author.avatarUrl}
              alt={`Profile photo of ${author.name}`}
              fill
              sizes="(max-width: 768px) 148px, 262px"
              className={styles.photo}
              unoptimized // Щоб Next.js не блокував зовнішні фото з бази
            />
          ) : (
            // Якщо фотографії немає, показуємо першу літеру імені автора
            <div className={styles.avatarPlaceholder}>
              {author.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <h3 className={styles.name}>{author.name}</h3>
      </article>
    </Link>
  );
}