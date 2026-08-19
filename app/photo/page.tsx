import UploadForm from "@/components/auth/UploadForm/UploadForm";
import Container from "@/components/common/Container/Container";
import styles from "./page.module.css";

export default function PhotoPage() {
  return (
    <section className={styles.main}>
      <Container>
          <UploadForm />
      </Container>
    </section>
  );
}
