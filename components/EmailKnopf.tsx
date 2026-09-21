"use client";

import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";

/**
 * E-Mail-Verweis ohne Klartextadresse im HTML: Die Adresse wird in zwei Teilen
 * übergeben und erst beim Klick zusammengesetzt. Das entspricht dem Schutz der
 * bisherigen Website (JavaScript-Verschleierung) gegen einfache Adress-Sammler.
 * Für Screenreader bleibt der Knopf verständlich («E-Mail an …»).
 */
export function EmailKnopf({ email, name, className }: { email: string; name: string; className?: string }) {
  const [nutzer, domain] = email.split("@");
  return (
    <button
      type="button"
      className={className}
      data-n={nutzer}
      data-d={domain}
      aria-label={`E-Mail an ${name}`}
      onClick={(e) => {
        const el = e.currentTarget;
        window.location.href = `mailto:${el.dataset.n}@${el.dataset.d}`;
      }}
    >
      <EnvelopeSimple weight="bold" aria-hidden="true" />
      <span>E-Mail</span>
    </button>
  );
}
