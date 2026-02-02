import PageShell from "@/components/ui/PageShell";

export default function FaqMunicipalitiesPage() {
  return (
    <PageShell
      kicker="FAQ"
      title="Häufige Fragen zu DigiEmu für Gemeinden"
      lead="Kurze Antworten zur Einordnung: Betrieb, Datenhoheit, Einführung und Pilot."
    >
      <h2>Was ist DigiEmu?</h2>
      <p>DigiEmu ist eine modulare Informationsinfrastruktur zur strukturierten Bereitstellung digitaler Inhalte.</p>

      <h2>Ist DigiEmu ein CMS?</h2>
      <p>Nein. DigiEmu ist kein klassisches Content-Management-System, sondern eine kontrollierbare Infrastruktur.</p>

      <h2>Ist DigiEmu eine Plattform?</h2>
      <p>DigiEmu kann als eigene Instanz betrieben werden (z. B. Gemeinde-eigen, CH/EU Hosting möglich).</p>

      <h2>Wo werden Daten gespeichert?</h2>
      <p>Hosting in der Schweiz oder EU ist möglich – je nach Vorgaben und gewünschter Betriebsform.</p>

      <h2>Gibt es Plattformabhängigkeiten?</h2>
      <p>Nein. Ziel ist Reduktion externer Abhängigkeiten, klare Datenhoheit und Wartbarkeit.</p>

      <h2>Gibt es ein Pilotprojekt?</h2>
      <p>Ja – ein 4–8-wöchiger Pilotbetrieb ist möglich, mit klaren Deliverables und Entscheidungsgrundlage.</p>

      <hr />

      <p>
        Weiter:
        <br />→ <a href="/use-cases/pilot">Pilotprojekt</a>
        <br />→ <a href="/contact/municipalities">Kontakt Gemeinden</a>
      </p>
    </PageShell>
  );
}
