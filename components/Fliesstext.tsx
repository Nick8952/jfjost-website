import Link from "next/link";
import type { Fliesstext as Fliesstexttyp, Textabsatz, Textspanne } from "@/lib/inhalt/typen";

/**
 * Renderer für Portable Text (lokal und aus Sanity identisch). Absichtlich
 * klein: Absätze, h3/h4, Zitat, Aufzählungen, fett, kursiv, Links.
 */
function Spanne({ spanne, absatz }: { spanne: Textspanne; absatz: Textabsatz }) {
  let inhalt: React.ReactNode = spanne.text;
  for (const mark of spanne.marks ?? []) {
    if (mark === "strong") inhalt = <strong>{inhalt}</strong>;
    else if (mark === "em") inhalt = <em>{inhalt}</em>;
    else {
      const def = absatz.markDefs?.find((d) => d._key === mark);
      if (def?._type === "link") {
        const extern = /^(https?:|mailto:|tel:)/.test(def.href);
        inhalt = extern ? (
          <a href={def.href} {...(def.blank && /^https?:/.test(def.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {inhalt}
          </a>
        ) : (
          <Link href={def.href}>{inhalt}</Link>
        );
      }
    }
  }
  return <>{inhalt}</>;
}

function Absatz({ absatz }: { absatz: Textabsatz }) {
  const kinder = absatz.children.map((s, i) => <Spanne key={i} spanne={s} absatz={absatz} />);
  switch (absatz.style) {
    case "h3":
      return <h3>{kinder}</h3>;
    case "h4":
      return <h4>{kinder}</h4>;
    case "blockquote":
      return <blockquote>{kinder}</blockquote>;
    default:
      return <p>{kinder}</p>;
  }
}

export function Fliesstext({ text, className }: { text: Fliesstexttyp; className?: string }) {
  const ausgabe: React.ReactNode[] = [];
  let liste: { art: "bullet" | "number"; eintraege: Textabsatz[] } | null = null;
  const listeSchliessen = () => {
    if (!liste) return;
    const Tag = liste.art === "number" ? "ol" : "ul";
    ausgabe.push(
      <Tag key={`liste-${ausgabe.length}`}>
        {liste.eintraege.map((e, i) => (
          <li key={e._key ?? i}>
            {e.children.map((s, j) => (
              <Spanne key={j} spanne={s} absatz={e} />
            ))}
          </li>
        ))}
      </Tag>
    );
    liste = null;
  };
  text.forEach((absatz, i) => {
    if (absatz.listItem) {
      if (!liste || liste.art !== absatz.listItem) {
        listeSchliessen();
        liste = { art: absatz.listItem, eintraege: [] };
      }
      liste.eintraege.push(absatz);
      return;
    }
    listeSchliessen();
    ausgabe.push(<Absatz key={absatz._key ?? i} absatz={absatz} />);
  });
  listeSchliessen();
  return <div className={["fliesstext", className].filter(Boolean).join(" ")}>{ausgabe}</div>;
}
