"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { bekanntgeben, EREIGNIS, erzeugen, lesen, SPEICHER_SCHLUESSEL, speichern, type Einwilligung, type Kategorie } from "./einwilligung";

/**
 * React-Anbindung der Einwilligung über useSyncExternalStore: Der Speicher
 * (localStorage bzw. der Rückfall im Speicher) ist die externe Quelle; das
 * eigene Ereignis und «storage» (andere Tabs) lösen ein Neulesen aus.
 * Der Server-Schnappschuss ist immer «nicht geladen», damit Server- und
 * Client-HTML identisch bleiben.
 */
function abonnieren(melden: () => void) {
  window.addEventListener(EREIGNIS, melden);
  window.addEventListener("storage", melden);
  return () => {
    window.removeEventListener(EREIGNIS, melden);
    window.removeEventListener("storage", melden);
  };
}

let rueckfall: string | null = null;

function rohLesen(): string | null {
  try {
    return window.localStorage.getItem(SPEICHER_SCHLUESSEL) ?? rueckfall;
  } catch {
    return rueckfall;
  }
}

export function useEinwilligung() {
  const roh = useSyncExternalStore(abonnieren, rohLesen, () => null);
  const geladen = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  // Memoisiert: gleiche Zeichenkette -> gleiches Objekt (Komponenten vergleichen per Identität).
  const einwilligung = useMemo(() => lesen(roh), [roh]);

  const setzen = useCallback((kategorien: Partial<Einwilligung["kategorien"]>) => {
    const neu = erzeugen(kategorien);
    rueckfall = JSON.stringify(neu);
    speichern(neu);
    bekanntgeben();
  }, []);

  const widerrufen = useCallback(() => {
    rueckfall = null;
    speichern(null);
    bekanntgeben();
  }, []);

  const erlaubt = useCallback((kategorie: Kategorie) => einwilligung?.kategorien[kategorie] === true, [einwilligung]);

  return { einwilligung, geladen, setzen, widerrufen, erlaubt };
}
