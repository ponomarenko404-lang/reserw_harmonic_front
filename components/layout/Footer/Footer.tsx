import Logo from "@/components/common/Logo/Logo";
import Container from "@/components/common/Container/Container";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <Logo />
          <p className={styles.copyright}>
            © 2026 Harmoniq. All rights reserved.
          </p>
          <nav className={styles.navigation} aria-label="Навігація у футері">
            <ul className={styles.navList}>
              <li>
                <Link href="/articles">Articles</Link>
              </li>
              <li>
                <Link href="/profile">Account</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
