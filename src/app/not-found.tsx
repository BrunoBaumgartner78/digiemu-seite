export const dynamic = "force-static";

export default function NotFound() {
  return (
    <main className="container page">
      <div style={{ maxWidth: 720 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>
          Seite nicht gefunden
        </h1>

        <p style={{ marginTop: 10, color: "rgba(0,0,0,0.65)", lineHeight: 1.6 }}>
          Die angeforderte Seite existiert nicht (mehr) oder der Link ist falsch.
          Nutze die folgenden Einstiegspunkte.
        </p>

        <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a className="btn" href="/">
            Startseite
          </a>
          <a className="btn" href="/product">
            Produkt
          </a>
          <a className="btn" href="/docs">
            Docs
          </a>
          <a className="btn" href="/municipalities">
            Gemeinden
          </a>
          <a className="btn" href="/contact/municipalities">
            Kontakt
          </a>
        </div>

        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: 13, color: "rgba(0,0,0,0.6)" }}>
            Häufig gesucht
          </div>
          <div style={{ marginTop: 8, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a className="pill" href="/comparison">Vergleich</a>
            <a className="pill" href="/faq/municipalities">FAQ Gemeinden</a>
            <a className="pill" href="/glossary">Glossar</a>
            <a className="pill" href="/use-cases">Use-Cases</a>
          </div>
        </div>
      </div>
    </main>
  );
}
