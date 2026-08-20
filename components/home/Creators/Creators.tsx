"use client";

import Container from "@/components/common/Container/Container";
import Loader from "@/components/common/Loader/Loader";
import { useTopCreators } from "@/lib/query/useTopCreators"; 
import Image from "next/image";
import Link from "next/link";
// 1. Імпортуємо тип IAuthor з офіційної папки типів проєкту
import type { IAuthor } from "@/types/author"; 
import styles from "./Creators.module.css";

export default function Creators() {
  const { data: creators = [], isLoading, isError } = useTopCreators();

  if (isError) return null;

  return (
    <section className={styles.section} id="top-creators">
      <Container>
        <div className={styles.heading}>
          <h2 className={styles.title}>Top Creators</h2>
          <Link className={styles.link} href="/authors">
            <span>Go to all Creators</span>
            <svg className={styles.arrow} aria-hidden="true">
              <use href="/icons/sprite.svg#icon-right-arrow-up" />
            </svg>
          </Link>
        </div>

        {isLoading ? (
          <Loader fullScreen={false} label="Loading top creators..." />
        ) : (
          <ul className={styles.list}>
            {/* 2. Чітко вказуємо тип (creator: IAuthor) для TypeScript */}
            {(creators as IAuthor[]).map((creator: IAuthor) => (
              <li className={styles.creator} key={creator.id}>
                <Link href={`/authors/${creator.id}`} className={styles.creatorLink}>
                  <div className={styles.avatar}>
                    <Image
                      src={creator.avatarUrl || "/images/default-avatar.png"}
                      alt={`Profile photo of ${creator.name}`}
                      fill
                      sizes="148px"
                      className={styles.avatarImage}
                    />
                  </div>
                  <span className={styles.creatorName}>{creator.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
