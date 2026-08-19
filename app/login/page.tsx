import LoginForm from "@/components/auth/LoginForm/LoginForm";
import Container from "@/components/common/Container/Container";
import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вхід | Назва Проєкту",
  description:
    "Увійдіть до свого акаунта, щоб отримати доступ до всіх можливостей сервісу.",
  openGraph: {
    title: "Вхід | Назва Проєкту",
    description:
      "Увійдіть до свого акаунта, щоб отримати доступ до всіх можливостей сервісу.",
  },
};

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
