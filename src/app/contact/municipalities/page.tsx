import PageShell from "@/components/ui/PageShell";

export default function ContactMunicipalitiesPage() {
  return (
    <PageShell
      kicker="Kontakt"
      title="Kontakt (Gemeinden)"
      lead="Unverbindlich, sachlich und ohne Verkaufsdruck. Schreiben Sie uns mit Anliegen und Kontext."
    >
      <h2>Wann ein Kontakt sinnvoll ist</h2>
      <ul>
        <li>Strukturierte Bereitstellung von Reglementen und Merkblättern</li>
        <li>Langfristige Archivierung</li>
        <li>Reduktion von Plattformabhängigkeiten</li>
        <li>Pilotprojekt oder Testbetrieb</li>
      </ul>

      <h2>Ablauf</h2>
      <ol>
        <li>Kurzes Erstgespräch</li>
        <li>Einordnung der Eignung</li>
        <li>Optionale nächste Schritte</li>
      </ol>

      <hr />

      <h2>Kontakt</h2>
      <p>
        <strong>E-Mail:</strong> <a href="mailto:bruno@brainbloom.ch">bruno@brainbloom.ch</a>
        <br />
        Bitte nennen Sie Gemeinde/Organisation, Kontaktperson und Fragestellung.
      </p>

      <p>
        Hinweis: Gespräche dienen der Einordnung und Prüfung. Kein Verkaufsdruck, keine Verpflichtung.
      </p>
    </PageShell>
  );
}

