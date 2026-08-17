import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link className={styles.logo} href="/" aria-label="Harmoniq — головна">
      <Image
        src="/icons/logo.svg"
        alt="Harmoniq"
        width={149}
        height={35}
        priority
      />
    </Link>
  );
}
