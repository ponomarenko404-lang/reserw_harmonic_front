"use client";

import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import styles from "./RegisterForm.module.css";
import { useRouter } from "next/navigation";
import type { FormikHelpers } from "formik";
import toast from "react-hot-toast";
import { registerUser } from "@/lib/api/auth";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const initialValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(32, "Name must be no more than 32 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Enter a valid email address")
    .max(64, "Email must be no more than 64 characters")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be no more than 64 characters")
    .required("Password is required"),

  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please repeat your password"),
});

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (
    values: RegisterFormValues,
    { resetForm, setSubmitting }: FormikHelpers<RegisterFormValues>,
  ) => {
    try {
      await registerUser(values);

      toast.success("Account created successfully");
      resetForm();
      router.push("/photo");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form} autoComplete="off">
            <h1 className={styles.title}>Register</h1>

            <p className={styles.description}>
              Join our community of mindfulness
              <br />
              and wellbeing!
            </p>

            {/* NAME */}
            <div className={styles.field}>
              <label htmlFor="name">Enter your name</label>

              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Max"
                className={styles.input}
                autoComplete="off"
              />

              <ErrorMessage
                name="name"
                component="span"
                className={styles.error}
              />
            </div>

            {/* EMAIL */}
            <div className={styles.field}>
              <label htmlFor="email">Enter your email address</label>

              <Field
                id="email"
                name="email"
                type="email"
                placeholder="email@gmail.com"
                className={styles.input}
                autoComplete="off"
              />

              <ErrorMessage
                name="email"
                component="span"
                className={styles.error}
              />
            </div>

            {/* PASSWORD */}
            <div className={styles.field}>
              <label htmlFor="password">Create a strong password</label>

              <div className={styles.passwordWrapper}>
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className={styles.input}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className={styles.passwordButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg className={styles.passwordIcon} aria-hidden="true">
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
                component="span"
                className={styles.error}
              />
            </div>

            {/* REPEAT PASSWORD */}
            <div className={styles.field}>
              <label htmlFor="repeatPassword">Repeat your password</label>

              <div className={styles.passwordWrapper}>
                <Field
                  id="repeatPassword"
                  name="repeatPassword"
                  type={showRepeatPassword ? "text" : "password"}
                  placeholder="********"
                  className={styles.input}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className={styles.passwordButton}
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  <svg className={styles.passwordIcon} aria-hidden="true">
                    <use
                      href={`/icons/sprite.svg#${
                        showRepeatPassword ? "icon-eye" : "icon-eye-crossed"
                      }`}
                    />
                  </svg>
                </button>
              </div>

              <ErrorMessage
                name="repeatPassword"
                component="span"
                className={styles.error}
              />
            </div>

            {/* SUBMIT */}
            <button
              className={styles.submitButton}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>

            {/* LOGIN */}
            <p className={styles.loginText}>
              Already have an account?{" "}
              <Link href="/login" className={styles.loginLink}>
                Log in
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
