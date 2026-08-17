import Container from "@/components/common/Container/Container";
import MyArticles from "@/components/profile/MyArticles/MyArticles";
import ProfileHeader from "@/components/profile/ProfileHeader/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs/ProfileTabs";
import SavedArticles from "@/components/profile/SavedArticles/SavedArticles";
import styles from "./page.module.css";

export default async function ProfilePage({
  searchParams,
}: PageProps<"/profile">) {
  const tab =
    (await searchParams).tab === "my-articles" ? "my-articles" : "saved";

  return (
    <div className={styles.page}>
      <section className={styles.main}>
        <Container>
          <h1 className={styles.title}>My profile</h1>

          <ProfileHeader />

          <ProfileTabs />

          <p className={styles.activeTab}>Active tab: {tab}</p>

          {tab === "my-articles" ? <MyArticles /> : <SavedArticles />}
        </Container>
      </section>
    </div>
  );
}
