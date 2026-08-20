import Container from "@/components/common/Container/Container";
import Image from "next/image";
import Link from "next/link";
import styles from "./Creators.module.css";

const creators = [
  { name: "Naomi", avatar: "/images/Naomi-1.webp" },
  { name: "Andrii", avatar: "/images/Andrii-2.webp" },
  { name: "Emma", avatar: "/images/Emma-3.webp" },
  { name: "Max", avatar: "/images/Max-4.webp" },
  { name: "Tony", avatar: "/images/Tony-5.webp" },
  { name: "Taylor", avatar: "/images/Taylor-6.webp" },
];

export default function Creators() {
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
          {creators.map((creator) => (
            <li className={styles.creator} key={creator.name}>
              <div className={styles.avatar}>
                <Image
                  src={creator.avatar}
                  alt={`Profile photo of ${creator.name}`}
                  fill
                  sizes="148px"
                  className={styles.avatarImage}
                />
              </div>

              <span className={styles.creatorName}>{creator.name}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
