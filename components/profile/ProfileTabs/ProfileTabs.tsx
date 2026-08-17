import Link from "next/link";
import styles from "./ProfileTabs.module.css";

export default function ProfileTabs() {
  return <nav className={styles.tabs} aria-label="Profile sections"><Link href="/profile?tab=saved">Saved articles</Link><Link href="/profile?tab=my-articles">My articles</Link></nav>;
}
