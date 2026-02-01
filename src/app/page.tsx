export default function Home() {
  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: 24 }}>
      <h1>DigiEmu</h1>
      <p>Modulare Plattform für digitale Produkte – Marktplatz oder Lizenz-/Custom-Lösung.</p>

      <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
        <a href="/product" style={{ fontWeight: 700 }}>→ Produkt</a>
        <a href="/use-cases" style={{ fontWeight: 700 }}>→ Use-Cases</a>
        <a href="/docs" style={{ fontWeight: 700 }}>→ Docs</a>
      </div>
    </main>
  );
}
