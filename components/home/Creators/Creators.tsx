import Container from "@/components/common/Container/Container";
import Link from "next/link";
import styles from "./Creators.module.css";

const creators = ["Naomi", "Andrii", "Emma", "Max", "Tony", "Taylor"];

export default function Creators() {
  return (
    <section className={styles.section} id="top-creators">
      <Container>
        <div className={styles.heading}>
          <h2 className={styles.title}>Top Creators</h2>
          <Link className={styles.link} href="/authors">
            See all creators
          </Link>
        </div>
        <ul className={styles.list}>
          {creators.map((creator) => (
            <li className={styles.creator} key={creator}>
              <div className={styles.avatar} aria-hidden="true" />
              <span>{creator}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
