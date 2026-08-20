import Container from "@/components/common/Container/Container";
// import Link from "next/link";
import MobileMenu from "@/components/layout/MobileMenu/MobileMenu";

import css from "./Header.module.css";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";
import Logo from "@/components/common/Logo/Logo";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className={css.header}>
      <Container className="container">
        <Logo />

        <nav aria-label="Main Navigation">
          <ul className={css.navigation}>
            <NavLinks />

            <AuthNavigation
              variant="nav"
              className={css.navLink}
              activeClassName={css.active}
            />

            <li className={css.authItem}>
              <AuthNavigation />
            </li>
          </ul>
        </nav>

        <div className={css.tabletControls}>
          <div className={css.tabletAction}>
            <AuthNavigation variant="tablet" />
          </div>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
