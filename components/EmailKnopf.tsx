"use client";

import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";

/**
 * E-Mail-Verweis ohne Klartextadresse im HTML: Die Adresse kommt kodiert
 * (umgekehrt + Base64, siehe lib/email-kodierung.ts) und wird erst beim Klick
 * dekodiert. Das hält einfache Adress-Sammler fern – vergleichbar mit der
 * JavaScript-Verschleierung der bisherigen Website. Gegen gezieltes Auslesen
 * schützt es nicht; das ist in docs/uebergabe.md festgehalten.
 */
export function EmailKnopf({ kodiert, name, className }: { kodiert: string; name: string; className?: string }) {
  return (
    <button
      type="button"
      className={className}
      data-k={kodiert}
      aria-label={`E-Mail an ${name}`}
      onClick={(e) => {
        const roh = e.currentTarget.dataset.k ?? "";
        const adresse = Array.from(decodeURIComponent(escape(atob(roh)))).reverse().join("");
        window.location.href = `mailto:${adresse}`;
      }}
    >
      <EnvelopeSimple weight="bold" aria-hidden="true" />
      <span>E-Mail</span>
    </button>
  );
}
