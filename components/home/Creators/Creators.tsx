"use client";

import { useTopAuthors } from "@/lib/query/useAuthors";
import Container from "@/components/common/Container/Container";
import Image from "next/image";
import Link from "next/link";
import styles from "./Creators.module.css";

const DEFAULT_AVATAR = "/images/default-avatar.png";

export default function Creators() {
  const { data: creators = [], isLoading } = useTopAuthors();

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

        <ul className={styles.list}>
          {isLoading
            ? Array.from({ length: 6 }, (_, index) => (
                <li
                  className={styles.creator}
                  key={`creator-skeleton-${index}`}
                />
              ))
            : creators.map((creator) => (
                <li className={styles.creator} key={creator._id}>
                  <Link
                    href={`/authors/${creator._id}`}
                    className={styles.avatar}
                  >
                    <Image
                      src={creator.avatarUrl || DEFAULT_AVATAR}
                      alt={`Profile photo of ${creator.name}`}
                      fill
                      sizes="148px"
                      className={styles.avatarImage}
                    />
                  </Link>

                  <span className={styles.creatorName}>
                    {creator.name.trim().split(/\s+/)[0]}
                  </span>
                </li>
              ))}
        </ul>
      </Container>
    </section>
  );
}
