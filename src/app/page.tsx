import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/content/site";
import styles from "./page.module.css";

export default function GalleryPage() {
  return (
    <SiteShell activePage="gallery">
      <section className={styles.introduction} aria-labelledby="gallery-title">
        <p className={styles.eyebrow}>Fotografía · {site.author}</p>
        <h1 className={styles.title} id="gallery-title">{site.title}</h1>
        <p className={styles.description}>Un espacio para compartir viajes y momentos a través de la fotografía.</p>
        <Link className={styles.link} href="/info">Sobre mí <span aria-hidden="true">→</span></Link>
      </section>
    </SiteShell>
  );
}
