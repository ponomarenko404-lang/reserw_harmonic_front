'use client';

import { useRef, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import { updateAvatar } from '@/lib/api/users';
import { useAuthStore } from '@/store/authStore';
import css from './UploadForm.module.css';

export default function UploadForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError(null);

    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select an image');
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleClose = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push('/');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a photo');
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

      router.push('/profile');
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      const message =
        error instanceof Error ? error.message : 'Failed to upload photo';
      setError(message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.formContainer}>
      <h2 className={css.title}>Upload your photo</h2>

      <button
        className={css.closeBtn}
        type="button"
        onClick={handleClose}
        aria-label="Close"
      >
        <svg width="13.5" height="13.5" viewBox="0 0 32 32" className={css['icon-close']}>
          <path
            stroke="black"
            strokeWidth="1"
            d="M7 7l9 9M16 16l-9 9M16 16l9 9M16 16l9 9M16 16l9-9"
          />
        </svg>
      </button>

      <input
        ref={inputRef}
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={css.hiddenInput}
      />

      <label htmlFor="avatar-upload" className={css.avatarLabel}>
        {preview ? (
          <img src={preview} alt="Avatar preview" className={css.avatarImage} />
        ) : (
          <div className={css.placeholderCircle}>
            <svg width="69" height="58" viewBox="0 0 98 82" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path strokeWidth="3" d="M67.0063 47.0865C67.0063 55.6629 58.7352 62.6154 48.5323 62.6154C38.3294 62.6154 30.0584 55.6629 30.0584 47.0865C30.0584 38.5102 38.3294 31.5577 48.5323 31.5577C58.7352 31.5577 67.0063 38.5102 67.0063 47.0865Z" stroke="#070707"/>
              <path strokeWidth="3" d="M0.5 68.5L0.500002 30.6514C0.500002 24.2908 6.63417 19.1346 14.2011 19.1346C19.3906 19.1346 24.1348 16.6699 26.4557 12.7682L29.5608 7.54802C32.1301 3.22851 37.3823 0.499982 43.1276 0.5L53.9372 0.500035C59.6824 0.500053 64.9345 3.22859 67.5039 7.54807L70.609 12.7683C72.9299 16.6701 77.674 19.1347 82.8636 19.1347C90.4305 19.1347 96.5647 24.2909 96.5647 30.6515V68.5C96.5647 75.5416 89.7737 81.25 81.3966 81.25H15.6681C7.29099 81.25 0.5 75.5416 0.5 68.5Z" stroke="#070707"/>
            </svg>
          </div>
        )}
      </label>

      {error && <p className={css.error}>{error}</p>}

      <Button
        type="submit"
        disabled={!file || isUploading}
        className={`${css.buttonSave} ${!file || isUploading ? css.buttonDisabled : css.buttonActive}`}
      >
        {isUploading ? 'Uploading...' : 'Save'}
      </Button>

      <button
        type="button"
        className={css.skipBtn}
        onClick={handleSkip}
        disabled={isUploading}
      >
        Skip
      </button>
    </form>
  );
}