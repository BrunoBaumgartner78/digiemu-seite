// Auto-link selected glossary terms in HTML output.
// Goal: Improve UX/SEO without changing authoring Markdown.
//
// Notes:
// - We avoid touching existing <a>...</a> and <code>...</code>/<pre>...</pre> blocks (best effort).
// - We only link the first occurrence per term to reduce noise.
// - Links point to /glossary (single glossary page). (No anchors required.)
//
// If you later want term-specific anchors, we can extend this to /glossary#term.

const TERMS: Array<{ re: RegExp; label: string; anchor: string }> = [
  { label: "Informationsinfrastruktur", anchor: "informationsinfrastruktur", re: /\bInformationsinfrastruktur\b/g },
  { label: "Instanz", anchor: "instanz", re: /\bInstanz\b/g },
  { label: "Datenhoheit", anchor: "datenhoheit", re: /\bDatenhoheit\b/g },
  { label: "Plattformabhängigkeit", anchor: "plattformabhaengigkeit", re: /\bPlattformabhängigkeit\b/g },
  { label: "Langzeitbetrieb", anchor: "langzeitbetrieb", re: /\bLangzeitbetrieb\b/g },
  { label: "CMS", anchor: "cms", re: /\bCMS\b/g },
  { label: "Content-Management-System", anchor: "cms", re: /\bContent-Management-System\b/g },
  { label: "Strukturierte Inhalte", anchor: "strukturierte-inhalte", re: /\bStrukturierte Inhalte\b/g },
  { label: "Versionierung", anchor: "versionierung", re: /\bVersionierung\b/g },
  { label: "Archivierung", anchor: "archivierung", re: /\bArchivierung\b/g },
  { label: "Pilotprojekt", anchor: "pilotprojekt", re: /\bPilotprojekt\b/g },
  { label: "Lizenz", anchor: "lizenz", re: /\bLizenz\b/g },
  { label: "Custom Setup", anchor: "custom-setup", re: /\bCustom Setup\b/g },
  { label: "Hosting", anchor: "hosting", re: /\bHosting\b/g },
  { label: "Barrierefreiheit", anchor: "barrierefreiheit", re: /\bBarrierefreiheit\b/g },
  { label: "Vendor Lock-in", anchor: "vendor-lock-in", re: /\bVendor Lock-in\b/g },
];

function splitProtected(html: string) {
  // Protect anchors, code, and pre blocks (best effort).
  const pattern = /(<a\b[\s\S]*?<\/a>|<pre\b[\s\S]*?<\/pre>|<code\b[\s\S]*?<\/code>)/gi;

  const parts: Array<{ kind: "protected" | "text"; value: string }> = [];
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = pattern.exec(html)) !== null) {
    const start = m.index;
    const end = start + m[0].length;
    if (start > last) parts.push({ kind: "text", value: html.slice(last, start) });
    parts.push({ kind: "protected", value: html.slice(start, end) });
    last = end;
  }
  if (last < html.length) parts.push({ kind: "text", value: html.slice(last) });
  return parts;
}

export function autoLinkGlossary(html: string): string {
  const parts = splitProtected(html);

  // Link first occurrence per term
  const used = new Set<string>();

  const linked = parts.map((p) => {
    if (p.kind === "protected") return p.value;

    let out = p.value;

    for (const t of TERMS) {
      if (used.has(t.label)) continue;

      const match = out.match(t.re);
      if (!match) continue;

      // Replace only first occurrence, link to specific anchor
      out = out.replace(t.re, (m) => {
        if (used.has(t.label)) return m;
        used.add(t.label);
        return `<a href="/glossary#${t.anchor}" class="glossary-link" title="Begriff im Glossar nachschlagen">${m}</a>`;
      });
    }

    return out;
  });

  return linked.join("");
}
