import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Einwilligungsbanner } from "@/components/Einwilligung";
import { Fuss } from "@/components/Fuss";
import { Kopf } from "@/components/Kopf";
import { StrukturierteDaten } from "@/components/StrukturierteDaten";
import { inhalt } from "@/lib/inhalt";
import { istIndexierbar, metadatenBasis, seiteUrl } from "@/lib/seite-url";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const start = await inhalt.startseite();
  return {
    metadataBase: metadatenBasis,
    title: { default: start.seo.titel, template: "%s – J.F. Jost & Co" },
    description: start.seo.beschreibung,
    // Die Verkaufs-Demo bleibt aus dem Index; Crawler dürfen die Seite lesen, damit sie das noindex sehen.
    robots: istIndexierbar ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: { type: "website", locale: "de_CH", siteName: "J.F. Jost & Co", url: seiteUrl.toString() },
    alternates: { canonical: seiteUrl.toString() },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffdd00",
  width: "device-width",
  initialScale: 1,
};

export default async function Layout({ children }: { children: ReactNode }) {
  const einstellungen = await inhalt.einstellungen();
  return (
    <html lang="de-CH">
      <body>
        <a href="#inhalt" className="sprung">
          Zum Inhalt springen
        </a>
        <Kopf einstellungen={einstellungen} />
        <main id="inhalt">{children}</main>
        <Fuss einstellungen={einstellungen} />
        <Einwilligungsbanner />
        <StrukturierteDaten einstellungen={einstellungen} />
      </body>
    </html>
  );
}
