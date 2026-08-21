"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { createArticle, updateArticle } from "@/lib/api/articles";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { InputEvent } from "react";
import Image from "next/image";
import type { ArticleDetails } from "@/types/article";
import styles from "./AddArticleForm.module.css";

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(48, "Title must be at most 48 characters")
    .required("Title is required"),

  description: Yup.string()
    .trim()
    .min(100, "Article must be at least 100 characters")
    .max(4000, "Article must be at most 4000 characters")
    .required("Article is required"),

  photo: Yup.mixed<File>().test(
    "fileSize",
    "Photo must be no larger than 1 MB",
    (value) => !value || value.size <= 1024 * 1024,
  ),
});

type AddArticleFormProps = {
  initialArticle?: ArticleDetails;
};

export default function AddArticleForm({
  initialArticle,
}: AddArticleFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(initialArticle);
  const [preview, setPreview] = useState<string | null>(
    initialArticle?.img ?? null,
  );

  return (
    <Formik
      initialValues={{
        title: initialArticle?.title ?? "",
        description: initialArticle?.article ?? "",
        photo: null as File | null,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        if (!isEditMode && !values.photo) {
          toast.error("Photo is required");
          return;
        }

        const formData = new FormData();

        formData.append("title", values.title.trim());
        formData.append("article", values.description.trim());

        if (isEditMode) {
          if (values.photo) {
            formData.append("photo", values.photo);
          } else if (initialArticle?.img) {
            formData.append("photo", initialArticle.img);
          }
        } else if (values.photo) {
          formData.append("img", values.photo);
        }

        if (!isEditMode) {
          formData.append("category", "general");
        }

        try {
          const result = initialArticle
            ? await updateArticle(initialArticle._id, formData)
            : await createArticle(formData);
          const articleId =
            result?.data?._id ?? result?._id ?? initialArticle?._id;

          if (!articleId) {
            throw new Error("Article ID was not returned");
          }

          await queryClient.invalidateQueries({ queryKey: ["userArticles"] });

          toast.success(
            isEditMode
              ? "Article updated successfully!"
              : "Article created successfully!",
          );

          router.push(`/articles/${articleId}`);
          router.refresh();
        } catch (error) {
          console.error(
            isEditMode ? "Update article error:" : "Create article error:",
            error,
          );

          toast.error(
            error instanceof Error
              ? error.message
              : isEditMode
                ? "Failed to update article"
                : "Failed to create article",
          );
        }
      }}
    >
      {({ setFieldValue, errors, submitCount, isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.photoField}>
            <input
              id="photo"
              type="file"
              name="photo"
              accept="image/*"
              className={styles.fileInput}
              onChange={(event) => {
                const file = event.currentTarget.files?.[0] ?? null;

                setFieldValue("photo", file);

                if (file) {
                  setPreview(URL.createObjectURL(file));
                } else {
                  setPreview(null);
                }
              }}
            />

            <label htmlFor="photo" className={styles.photoLabel}>
              {preview ? (
                <Image
                  src={preview}
                  alt="Article preview"
                  fill
                  className={styles.previewImage}
                />
              ) : (
                <Image
                  src="/icons/camera.svg"
                  alt="Upload photo"
                  width={96}
                  height={81}
                  className={styles.cameraIcon}
                />
              )}
            </label>

            {submitCount > 0 && errors.photo && (
              <div className={styles.error}>{errors.photo}</div>
            )}
          </div>

          <label className={`${styles.field} ${styles.titleField}`}>
            Title
            <Field
              type="text"
              name="title"
              placeholder="Enter a title"
              className={styles.input}
            />
            <ErrorMessage
              name="title"
              component="div"
              className={styles.error}
            />
          </label>

          <div className={`${styles.field} ${styles.descriptionField}`}>
            <Field
              as="textarea"
              name="description"
              placeholder="Enter a text"
              className={styles.textarea}
              aria-label="Article text"
              onInput={(event: InputEvent<HTMLTextAreaElement>) => {
                const textarea = event.currentTarget;

                textarea.style.height = "auto";
                textarea.style.height = `${textarea.scrollHeight}px`;
                textarea.scrollTop = 0;
              }}
            />

            <ErrorMessage
              name="description"
              component="div"
              className={styles.error}
            />
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? isEditMode
                ? "Updating..."
                : "Publishing..."
              : isEditMode
                ? "Update article"
                : "Publish article"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
