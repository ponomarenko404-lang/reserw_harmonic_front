import LoginForm from "@/components/auth/LoginForm/LoginForm";
import Container from "@/components/common/Container/Container";
import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <section className={styles.main}>
      <Container>
        <div className={styles.loginWrapper}>
          <LoginForm />
        </div>
      </Container>
    </section>
  );
}
