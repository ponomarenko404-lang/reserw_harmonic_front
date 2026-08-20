"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import UserBar from "../layout/UserBar/UserBar";
import LogoutModal from "../layout/LogoutModal/LogoutModal";
import Button from "../common/Button/Button";
import css from "./AuthNavigation.module.css";

interface AuthNavigationProps {
  onLinkClick?: () => void;
  variant?: "default" | "tablet" | "menu" | "nav";
  className?: string;
}

export default function AuthNavigation({
  onLinkClick,
  variant = "default",
  className,
}: AuthNavigationProps) {
  const router = useRouter();

  const { user, isLoggedIn, fetchCurrentUser, logout } = useAuthStore();

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (isLoggedIn && user?._id) {
      fetchCurrentUser();
    }
  }, [isLoggedIn, user?._id, fetchCurrentUser]);

  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true);
      logout();
      setIsLogoutOpen(false);
      router.push("/");
      if (onLinkClick) onLinkClick();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (variant === "tablet") {
    return (
      <div className={css.tabletAuth}>
        {isLoggedIn && user ? (
          <Link
            href="/articles/create"
            className={css.compactButton}
            onClick={onLinkClick}
          >
            Create an article
          </Link>
        ) : (
          <Link
            href="/register"
            className={css.compactButton}
            onClick={onLinkClick}
          >
            Join now
          </Link>
        )}
      </div>
    );
  }

  if (variant === "menu") {
    return (
      <div className={css.menuAuth}>
        {isLoggedIn && user ? (
          <>
            <Link href="/profile" onClick={onLinkClick}>
              My Profile
            </Link>

            <div className={css.mobileMenuAction}>
              <Link
                href="/articles/create"
                className={css.compactButton}
                onClick={onLinkClick}
              >
                Create an article
              </Link>
            </div>

            <UserBar onLogoutClick={() => setIsLogoutOpen(true)} />

            {isLogoutOpen && (
              <LogoutModal
                isOpen={isLogoutOpen}
                isLoading={isLoggingOut}
                onClose={() => setIsLogoutOpen(false)}
                onConfirm={handleConfirmLogout}
              />
            )}
          </>
        ) : (
          <>
            <Link href="/login" onClick={onLinkClick}>
              Log in
            </Link>

            <div className={css.mobileMenuAction}>
              <Link
                href="/register"
                className={css.compactButton}
                onClick={onLinkClick}
              >
                Join now
              </Link>
            </div>
          </>
        )}
      </div>
    );
  }

  if (variant === "nav") {
    if (!isLoggedIn) return null;

    return (
      <li>
        <Link href="/profile" className={className}>
          My profile
        </Link>
      </li>
    );
  }

  return (
    <div className={css.authNav}>
      {isLoggedIn && user ? (
        <div className={css.authenticated}>
          <div className={css.createBtnWrapper}>
            <Link href="/articles/create" onClick={onLinkClick}>
              <Button variant="fill" size="md">
                Create an article
              </Button>
            </Link>
          </div>

          <UserBar onLogoutClick={() => setIsLogoutOpen(true)} />

          {isLogoutOpen && (
            <LogoutModal
              isOpen={isLogoutOpen}
              isLoading={isLoggingOut}
              onClose={() => setIsLogoutOpen(false)}
              onConfirm={handleConfirmLogout}
            />
          )}
        </div>
      ) : (
        <div className={css.unauthenticated}>
          <Link href="/login" onClick={onLinkClick} className={css.loginBtn}>
            Log in
          </Link>

          <Link href="/register" onClick={onLinkClick} className={css.joinBtn}>
            Join now
          </Link>
        </div>
      )}
    </div>
  );
}
