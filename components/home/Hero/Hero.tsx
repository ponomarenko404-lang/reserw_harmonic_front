import Link from "next/link";

import Container from "@/components/common/Container/Container";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.content}>
          <div className={styles.image} aria-hidden="true" />

          <div className={styles.copy}>
            <h1 className={styles.title}>
              Find your <em>harmony</em> in community
            </h1>

            <div className={styles.actions}>
              <Link href="#popular-articles" className={styles.primaryButton}>
                Go to Articles
              </Link>

              <Link href="/register" className={styles.outlineButton}>
                Register
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
