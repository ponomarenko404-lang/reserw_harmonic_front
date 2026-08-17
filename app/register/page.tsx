import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import Container from "@/components/common/Container/Container";
import styles from "./page.module.css";

export default function RegisterPage() {
  return (
    <section className={styles.main}>
      <Container>
          <RegisterForm />
      </Container>
    </section>
  );
}

