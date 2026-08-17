"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { updateAvatar } from "@/lib/api/users";
import { useAuthStore } from "@/store/authStore";
import styles from "./UploadForm.module.css";
import Image from "next/image";

export default function UploadForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Please select an image");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const file = inputRef.current?.files?.[0];

    if (!file) {
      setError("Please select a photo");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      const updatedUser = await updateAvatar(file);

      if (user) {
        setUser({
          ...user,
          avatarUrl: updatedUser.avatarUrl,
        });
      }

      router.push("/profile");
    } catch (error) {
      console.error("Failed to upload avatar:", error);
      setError("Failed to upload photo");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSkip = () => {
    router.push("/");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        hidden
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
      >
        {preview ? (
          <Image src={preview} alt="Selected avatar" width={200} height={200} />
        ) : (
          "Choose photo"
        )}
      </button>

      {error && <p>{error}</p>}

      <button type="submit" disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload photo"}
      </button>

      <button type="button" onClick={handleSkip} disabled={isUploading}>
        Skip
      </button>
    </form>
  );
}
