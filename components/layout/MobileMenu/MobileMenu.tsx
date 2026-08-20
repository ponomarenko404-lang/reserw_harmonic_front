"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";
import styles from "./MobileMenu.module.css";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;

      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsOpen(false);
    });

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1440px)");

    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };

    desktopQuery.addEventListener("change", handleDesktopChange);

    return () => {
      desktopQuery.removeEventListener("change", handleDesktopChange);
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);

    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });
  };

  return (
    <div className={styles.mobileMenu}>
      <button
        className={styles.menuButton}
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((previous) => !previous)}
      >
        <svg className={styles.icon} aria-hidden="true">
          <use
            href={
              isOpen
                ? "/icons/sprite.svg#icon-close"
                : "/icons/sprite.svg#icon-burger"
            }
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.backdrop} onClick={closeMenu}>
          <nav
            id="mobile-navigation"
            className={styles.menu}
            aria-label="Mobile navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <Link href="/" onClick={handleLinkClick}>
              Home
            </Link>

            <Link href="/articles" onClick={handleLinkClick}>
              Articles
            </Link>

            <Link href="/authors" onClick={handleLinkClick}>
              Creators
            </Link>

            <AuthNavigation variant="menu" onLinkClick={handleLinkClick} />
          </nav>
        </div>
      )}
    </div>
  );
}
