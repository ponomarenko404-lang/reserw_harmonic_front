"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/articles", label: "Articles" },
    { href: "/authors", label: "Creators" },
  ];

  return (
    <>
      {links.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <li key={href}>
            <Link
              href={href}
              className={`${css.navLink} ${isActive ? css.active : ""}`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </>
  );
}
