"use client";

import { useEffect, useRef, type ReactNode } from "react";
import stile from "./Einblenden.module.css";

/**
 * Dezentes Einblenden beim Scrollen (Deckkraft + 12 px). Ohne JavaScript und
 * bei reduzierter Bewegung ist alles sofort sichtbar (siehe CSS).
 */
export function Einblenden({ children, className, verzoegerung = 0, als: Tag = "div" }: { children: ReactNode; className?: string; verzoegerung?: number; als?: "div" | "section" | "article" | "li" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add(stile.sichtbar);
      return;
    }
    const beobachter = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          if (e.isIntersecting) {
            el.classList.add(stile.sichtbar);
            beobachter.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    beobachter.observe(el);
    return () => beobachter.disconnect();
  }, []);
  return (
    // @ts-expect-error – generisches Tag mit gemeinsamem Ref
    <Tag ref={ref} className={[stile.einblenden, className].filter(Boolean).join(" ")} style={verzoegerung ? { transitionDelay: `${verzoegerung}ms` } : undefined}>
      {children}
    </Tag>
  );
}
