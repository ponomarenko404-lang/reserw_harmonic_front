"use client";

import { useEffect, useState } from "react";
import css from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    () => typeof window !== "undefined" && localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    const newIsDark = !isDark;

    setIsDark(newIsDark);

    const theme = newIsDark ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <button
      type="button"
      className={`${css.toggle} ${isDark ? css.dark : ""}`}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
    >
      <span className={css.icon}>{isDark ? "☀" : "☾"}</span>
    </button>
  );
}