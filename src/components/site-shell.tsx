import Link from "next/link";
import { site } from "@/content/site";
import styles from "./site-shell.module.css";

type SiteShellProps = {
  activePage: "gallery" | "info";
  children: React.ReactNode;
};

export function SiteShell({ activePage, children }: SiteShellProps) {
  return (
    <div className={styles.shell}>
      <a className={styles.skipLink} href="#main-content">Saltar al contenido</a>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">{site.author}</Link>
        <span className={styles.motto}>{site.motto}</span>
        <nav className={styles.navigation} aria-label="Navegación principal">
          <Link href="/" aria-current={activePage === "gallery" ? "page" : undefined}>Galería</Link>
          <Link href="/info" aria-current={activePage === "info" ? "page" : undefined}>Info</Link>
        </nav>
      </header>
      <main id="main-content" className={styles.main} tabIndex={-1}>{children}</main>
      <footer className={styles.footer}>
        <span>{site.title}</span>
        <Link href={activePage === "info" ? "/" : "/info"}>
          {activePage === "info" ? "Volver a la galería" : "Conocer a Karina"} <span aria-hidden="true">→</span>
        </Link>
      </footer>
    </div>
  );
}
