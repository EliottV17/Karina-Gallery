import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Info" };

export default function InfoPage() {
  return (
    <SiteShell activePage="info">
      <div className={styles.layout}>
        <section aria-labelledby="info-title">
          <p className={styles.eyebrow}>Sobre mí</p>
          <h1 className={styles.title} id="info-title">Soy {site.author}.</h1>
          <div className={styles.biography}>
            {site.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
        <aside className={styles.network} aria-label="Redes sociales">
          <p className={styles.eyebrow}>Redes</p>
          <a className={styles.socialLink} href={site.instagram.url}>Instagram <span aria-hidden="true">↗</span></a>
          <span className={styles.handle}>{site.instagram.handle}</span>
        </aside>
      </div>
    </SiteShell>
  );
}
