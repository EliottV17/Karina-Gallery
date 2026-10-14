import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import "./globals.css";

const manrope = localFont({
  src: "../assets/Manrope.ttf",
  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: { default: site.title, template: `%s | ${site.title}` },
  description: "Portfolio fotográfico de Karina Lauer: viajes y momentos.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
