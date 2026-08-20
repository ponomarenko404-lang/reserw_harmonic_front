import Link from "next/link";
import styles from "./ProfileTabs.module.css";

type ProfileTabsProps = { activeTab: "saved" | "my-articles" };

export default function ProfileTabs({ activeTab }: ProfileTabsProps) {
  return (
    <nav className={styles.tabs} aria-label="Profile sections">
      <Link
        className={activeTab === "my-articles" ? styles.active : ""}
        href="/profile?tab=my-articles"
      >
        My Articles
      </Link>
      <Link
        className={activeTab === "saved" ? styles.active : ""}
        href="/profile?tab=saved"
      >
        Saved Articles
      </Link>
    </nav>
  );
}
