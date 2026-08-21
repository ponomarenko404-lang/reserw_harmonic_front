import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import Container from "@/components/common/Container/Container";
import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Реєстрація | Назва Проєкту",
  description:
    "Створіть новий акаунт, щоб отримати доступ до всіх можливостей сервісу.",
  openGraph: {
    title: "Реєстрація | Назва Проєкту",
    description:
      "Створіть новий акаунт, щоб отримати доступ до всіх можливостей сервісу.",
  },
};

export default function RegisterPage() {
  return (
    <section className={styles.main}>
      <Container>
          <RegisterForm />
      </Container>
    </section>
  );
}
