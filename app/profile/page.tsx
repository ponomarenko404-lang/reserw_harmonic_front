import Container from "@/components/common/Container/Container";
import ProfileHeader from "@/components/profile/ProfileHeader/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs/ProfileTabs";
import styles from "./page.module.css";

export default async function ProfilePage({
  searchParams,
}: PageProps<"/profile">) {
  const tab = (await searchParams).tab === "saved" ? "saved" : "my-articles";

  return (
    <div className={styles.page}>
      <section className={styles.main}>
        <Container>
          <h1 className={styles.title}>My Profile</h1>

          <ProfileHeader />

          <ProfileTabs activeTab={tab} />
        </Container>
      </section>
    </div>
  );
}
