import type { MetadataRoute } from "next";
import { absolut, istIndexierbar } from "@/lib/seite-url";

export const dynamic = "force-static";

/**
 * Crawler dürfen alles lesen – nur so sehen sie das noindex der Demo.
 * Erst mit NEXT_PUBLIC_INDEXIEREN=ja (Kundendomain) wird die Sitemap genannt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(istIndexierbar ? { sitemap: absolut("/sitemap.xml") } : {}),
  };
}
