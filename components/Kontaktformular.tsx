"use client";

import { useId, useState, useSyncExternalStore, type FormEvent } from "react";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import stile from "./Kontaktformular.module.css";

type Felder = { anliegen: string[]; vorname: string; name: string; email: string; telefon: string; nachricht: string };
type Fehler = Partial<Record<keyof Felder, string>>;

/**
 * Kontaktformular ohne Server: «E-Mail vorbereiten» öffnet das E-Mail-Programm
 * mit Betreff und Text an info@jfjost.ch. Es wird nichts gesendet oder
 * gespeichert, und es gibt keine falsche Versandbestätigung. Die Anliegen
 * entsprechen der bisherigen Website (Mieten, Kaufen, Jobs, Baudienstleistungen);
 * ein Anliegen kann per ?anliegen=… vorbelegt werden.
 */
export function Kontaktformular({ anliegen, empfaenger, hinweis }: { anliegen: string[]; empfaenger: string; hinweis: string }) {
  const id = useId();
  const [felder, setFelder] = useState<Felder>({ anliegen: [], vorname: "", name: "", email: "", telefon: "", nachricht: "" });
  const [fehler, setFehler] = useState<Fehler>({});
  const [vorbereitet, setVorbereitet] = useState<string | null>(null);

  // ?anliegen=… aus der Adresse: auf dem Server leer, im Browser nach der Hydration gelesen.
  const suche = useSyncExternalStore(
    () => () => {},
    () => window.location.search,
    () => ""
  );
  const [gesehen, setGesehen] = useState("");
  if (suche !== gesehen) {
    setGesehen(suche);
    const wert = new URLSearchParams(suche).get("anliegen");
    if (wert && anliegen.includes(wert)) setFelder((f) => ({ ...f, anliegen: [wert] }));
  }

  const setzen = (name: keyof Felder, wert: string) => setFelder((f) => ({ ...f, [name]: wert }));
  const anliegenSchalten = (a: string) => setFelder((f) => ({ ...f, anliegen: f.anliegen.includes(a) ? f.anliegen.filter((x) => x !== a) : [...f.anliegen, a] }));

  const pruefen = (): Fehler => {
    const e: Fehler = {};
    if (!felder.vorname.trim()) e.vorname = "Bitte Vornamen angeben.";
    if (!felder.name.trim()) e.name = "Bitte Namen angeben.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(felder.email.trim())) e.email = "Bitte eine gültige E-Mail-Adresse angeben, z. B. name@beispiel.ch.";
    if (!felder.nachricht.trim()) e.nachricht = "Bitte beschreiben Sie Ihr Anliegen in wenigen Sätzen.";
    return e;
  };

  const absenden = (ev: FormEvent) => {
    ev.preventDefault();
    const e = pruefen();
    setFehler(e);
    if (Object.keys(e).length > 0) {
      const erstes = Object.keys(e)[0];
      document.getElementById(`${id}-${erstes}`)?.focus();
      return;
    }
    const betreff = `Anfrage${felder.anliegen.length ? ` (${felder.anliegen.join(", ")})` : ""} – ${felder.vorname} ${felder.name}`;
    const text = [
      `Anliegen: ${felder.anliegen.length ? felder.anliegen.join(", ") : "–"}`,
      `Name: ${felder.vorname} ${felder.name}`,
      `E-Mail: ${felder.email}`,
      `Telefon: ${felder.telefon || "–"}`,
      "",
      felder.nachricht,
      "",
      "(Nachricht vorbereitet über die Website)",
    ].join("\n");
    const mailto = `mailto:${empfaenger}?subject=${encodeURIComponent(betreff)}&body=${encodeURIComponent(text)}`;
    setVorbereitet(mailto);
    window.location.href = mailto;
  };

  const feld = (name: Exclude<keyof Felder, "anliegen">, label: string, typ = "text", pflicht = false, autoComplete?: string) => (
    <div className={stile.feld}>
      <label htmlFor={`${id}-${name}`}>
        {label}
        {pflicht && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={`${id}-${name}`}
        name={name}
        type={typ}
        value={felder[name]}
        onChange={(e) => setzen(name, e.target.value)}
        required={pflicht}
        aria-required={pflicht || undefined}
        aria-invalid={fehler[name] ? true : undefined}
        aria-describedby={fehler[name] ? `${id}-${name}-fehler` : undefined}
        autoComplete={autoComplete}
        inputMode={typ === "tel" ? "tel" : typ === "email" ? "email" : undefined}
      />
      {fehler[name] && (
        <p id={`${id}-${name}-fehler`} className={stile.fehler}>
          {fehler[name]}
        </p>
      )}
    </div>
  );

  return (
    <form className={stile.formular} onSubmit={absenden} noValidate>
      <fieldset className={stile.anliegen}>
        <legend>Ihr Anliegen</legend>
        <div className={stile.chips}>
          {anliegen.map((a) => (
            <label key={a} className={[stile.chip, felder.anliegen.includes(a) ? stile.chipAktiv : ""].join(" ")}>
              <input type="checkbox" name="anliegen" value={a} checked={felder.anliegen.includes(a)} onChange={() => anliegenSchalten(a)} className="sr-only" />
              <span className={stile.chipQuadrat} aria-hidden="true" />
              <span>{a}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={stile.zeile}>
        {feld("vorname", "Vorname", "text", true, "given-name")}
        {feld("name", "Name", "text", true, "family-name")}
      </div>
      <div className={stile.zeile}>
        {feld("email", "E-Mail", "email", true, "email")}
        {feld("telefon", "Telefon (freiwillig)", "tel", false, "tel")}
      </div>
      <div className={stile.feld}>
        <label htmlFor={`${id}-nachricht`}>
          Nachricht<span aria-hidden="true"> *</span>
        </label>
        <textarea
          id={`${id}-nachricht`}
          name="nachricht"
          rows={6}
          value={felder.nachricht}
          onChange={(e) => setzen("nachricht", e.target.value)}
          required
          aria-required="true"
          aria-invalid={fehler.nachricht ? true : undefined}
          aria-describedby={fehler.nachricht ? `${id}-nachricht-fehler` : `${id}-hinweis`}
        />
        {fehler.nachricht && (
          <p id={`${id}-nachricht-fehler`} className={stile.fehler}>
            {fehler.nachricht}
          </p>
        )}
      </div>

      <p id={`${id}-hinweis`} className={stile.hinweis}>
        {hinweis}
      </p>
      <p className={stile.pflicht}>* Pflichtfeld</p>

      <div className={stile.aktionen}>
        <button type="submit" className="knopf">
          <EnvelopeSimple weight="bold" aria-hidden="true" />
          <span>E-Mail vorbereiten</span>
        </button>
      </div>

      {vorbereitet && (
        <p className={stile.status} role="status">
          Ihr E-Mail-Programm sollte sich jetzt mit der vorbereiteten Nachricht an {empfaenger} geöffnet haben. Falls nicht:{" "}
          <a href={vorbereitet} className="textlink">E-Mail-Entwurf erneut öffnen</a> oder schreiben Sie direkt an <a href={`mailto:${empfaenger}`} className="textlink">{empfaenger}</a>.
        </p>
      )}
    </form>
  );
}
