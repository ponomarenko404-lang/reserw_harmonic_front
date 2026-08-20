"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

import Button from "@/components/common/Button/Button";
import { useLogin } from "@/hooks/useLogin";
import type { LoginCredentials } from "@/types/auth";
import { useAuthStore } from "@/store/authStore";

import styles from "./LoginForm.module.css";

const initialValues: LoginCredentials = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),

  password: Yup.string().required("Password is required"),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  const { mutateAsync: login, isPending } = useLogin();

  const handleSubmit = async (values: LoginCredentials) => {
    try {
      const userData = await login(values);

      setUser(userData);

      if (userData.avatarUrl === "https://goit.global") {
        router.replace("/photo");
        return;
      }

      router.replace("/");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";

      toast.error(message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <h1 className={styles.title}>Login</h1>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Enter your email address
          </label>

          <Field
            id="email"
            name="email"
            type="email"
            placeholder="email@gmail.com"
            className={styles.input}
            autoComplete="new-email"
          />

          <ErrorMessage name="email" component="p" className={styles.error} />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>
            Enter a password
          </label>

          <div className={styles.passwordWrapper}>
            <Field
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="********"
              className={`${styles.input} ${styles.passwordInput}`}
            />

            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <svg className={styles.eyeIcon} aria-hidden="true">
                <use
                  href={`/icons/sprite.svg#${
                    showPassword ? "icon-eye" : "icon-eye-crossed"
                  }`}
                />
              </svg>
            </button>
          </div>

          <ErrorMessage
            name="password"
            component="p"
            className={styles.error}
          />
        </div>

        <Button
          type="submit"
          variant="fill"
          size="md"
          fullWidth
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>

        <p className={styles.registerText}>
          Don&apos;t have an account?{" "}
          <Link href="/register" className={styles.registerLink}>
            Register
          </Link>
        </p>
      </Form>
    </Formik>
  );
}
