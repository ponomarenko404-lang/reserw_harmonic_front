import Image from "next/image";
import Container from "@/components/common/Container/Container";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.section} id="about">
      <Container>
        <div className={styles.content}>
          <div className={styles.about}>
            <h2 className={styles.title}>About us</h2>

            <p className={styles.description}>
              Harmoniq is a mindful publishing platform dedicated to mental
              health and well-being. We bring together writers, thinkers, and
              readers who believe that open, thoughtful stories can heal,
              inspire, and connect. Whether you&apos;re here to share your
              journey or learn from others — this is your space to slow down,
              reflect, and grow.
            </p>
          </div>

          <div className={styles.image}>
            <Image
              className={styles.mobileImage}
              src="/images/about/image-lotus-mobile.webp"
              alt="Lotus flower"
              fill
              sizes="100vw"
            />

            <Image
              className={styles.tabletImage}
              src="/images/about/image-lotus-tablet.webp"
              alt="Lotus flower"
              fill
              sizes="100vw"
            />

            <Image
              className={styles.desktopImage}
              src="/images/about/image-lotus-desktop.webp"
              alt="Lotus flower"
              fill
              sizes="60vw"
            />
          </div>

          <div className={styles.image}>
            <Image
              src="/images/about/image-people.webp"
              alt="People walking together"
              fill
              sizes="(max-width: 767px) 100vw, 70vw"
            />
          </div>

          <div className={styles.image}>
            <Image
              src="/images/about/image-meditation.webp"
              alt="Person meditating"
              fill
              sizes="(max-width: 767px) 100vw, 30vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
