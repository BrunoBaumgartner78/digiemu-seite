import Link from "next/link";
import PageShell from "@/components/ui/PageShell";

export default function MunicipalitiesPage() {
  return (
    <PageShell
      kicker="Gemeinden"
      title="Informationsinfrastruktur für Gemeinden"
      lead="Strukturiert, langfristig und datenschutzfreundlich – mit klarer Verantwortung und sauberem Betrieb."
      actions={
        <>
          <Link className="btn btn-primary" href="/contact/municipalities">Unverbindliche Abklärung</Link>
          <Link className="btn" href="/product">Technische Kurzbeschreibung</Link>
          <Link className="btn" href="/use-cases/pilot">Pilotprojekt (4–8 Wochen)</Link>
        </>
      }
    >
      <h2>Kurzüberblick</h2>
      <p>
        DigiEmu hilft Gemeinden, Reglemente, Protokolle, Merkblätter und Bürgerinformationen langfristig
        auffindbar und kontrolliert bereitzustellen.
      </p>

      <h2>Wofür es passt</h2>
      <ul>
        <li>Reglemente &amp; Verordnungen</li>
        <li>Protokolle &amp; Beschlüsse</li>
        <li>Merkblätter &amp; Richtlinien</li>
        <li>Dossiers &amp; Bürgerinformationen</li>
      </ul>

      <h2>3 Wege zum Einstieg</h2>
      <ol>
        <li><strong>Anwendungsbeispiel:</strong> <a href="/use-cases/municipalities">Use-Case Gemeinden</a></li>
        <li><strong>Lizenz &amp; Custom:</strong> <a href="/product">Produkt &amp; Lizenzmodell</a></li>
        <li><strong>Pilotprojekt:</strong> <a href="/use-cases/pilot">4–8 Wochen Testbetrieb</a></li>
      </ol>

      <hr />

      <p>
        Weiterführend:
        <br />→ <a href="/faq/municipalities">FAQ Gemeinden</a>
        <br />→ <a href="/contact/municipalities">Kontakt &amp; Abklärung</a>
      </p>
    </PageShell>
  );
}
