export default function DocsOverview() {
  return (
    <>
      <header className="pageHeader">
        <p className="pageKicker">Docs</p>
        <h1 className="pageTitle">Übersicht</h1>
        <p className="pageLead">
          Willkommen in den DigiEmu Docs. Hier findest du die wichtigsten Konzepte, Abläufe und
          Entscheidungen – kompakt, strukturiert und praxisnah.
        </p>

        <div className="btnRow">
          <a className="btn btn-primary" href="/docs/getting-started">
            Erste Schritte
          </a>
          <a className="btn" href="/docs/roles">
            Rollen & Rechte
          </a>
          <a className="btn" href="/docs/upload-product">
            Produkt hochladen
          </a>
        </div>
      </header>

      <section className="section">
        <div className="card">
          <div className="prose">
            <h2>Wofür DigiEmu gedacht ist</h2>
            <p>
              DigiEmu ist eine modulare Plattform für digitale Inhalte: Du kannst sie als
              Marktplatz betreiben oder als Lizenz-/Custom-Lösung für Organisationen einsetzen
              (z. B. Gemeinden, Bildungsanbieter, Vereine).
            </p>

            <h2>So ist die Doku aufgebaut</h2>
            <ul>
              <li>
                <strong>Übersicht:</strong> Einstieg, Navigation und Grundprinzipien.
              </li>
              <li>
                <strong>Rollen:</strong> Buyer, Vendor, Admin – wer darf was?
              </li>
              <li>
                <strong>Vendor Onboarding:</strong> Verkäuferprofil und Setup.
              </li>
              <li>
                <strong>Produkt hochladen:</strong> Datei, Metadaten, Thumbnail, Preis.
              </li>
              <li>
                <strong>Checkout:</strong> Kaufablauf, Bestell- & Download-Logik.
              </li>
            </ul>

            <h2>Typische Workflows</h2>
            <h3>Als Vendor</h3>
            <ol>
              <li>Registrieren & Vendor-Profil anlegen</li>
              <li>Produkt erstellen (Titel, Beschreibung, Preis)</li>
              <li>Datei(en) hochladen und veröffentlichen</li>
              <li>Verkäufe prüfen und Downloads nachvollziehen</li>
            </ol>

            <h3>Als Buyer</h3>
            <ol>
              <li>Produkt auswählen</li>
              <li>Bezahlen (Checkout)</li>
              <li>Download-Seite öffnen</li>
              <li>Datei herunterladen (gültiger Link, optional mit Ablauf)</li>
            </ol>

            <h3>Als Admin</h3>
            <ol>
              <li>Produkte und Vendoren prüfen</li>
              <li>Download-Logs & Statistiken einsehen</li>
              <li>Payouts verwalten (Status, Abrechnung)</li>
            </ol>

            <h2>Empfohlener Einstieg</h2>
            <ul>
              <li>
                Starte mit <a href="/docs/getting-started">Erste Schritte</a>, um das Systembild zu
                verstehen.
              </li>
              <li>
                Danach <a href="/docs/roles">Rollen</a>, damit Rechte & Zugriff klar sind.
              </li>
              <li>
                Dann <a href="/docs/upload-product">Produkt hochladen</a>, um den Kern-Flow zu
                beherrschen.
              </li>
            </ul>

            <hr />

            <h2>Glossar (kurz)</h2>
            <ul>
              <li>
                <strong>Vendor:</strong> Verkäufer, der Produkte erstellt und verkauft.
              </li>
              <li>
                <strong>Buyer:</strong> Käufer, der ein Produkt erwirbt.
              </li>
              <li>
                <strong>Checkout:</strong> Zahlungsprozess (z. B. Stripe).
              </li>
              <li>
                <strong>Download-Link:</strong> kontrollierter Zugriff auf die Datei nach Kauf.
              </li>
              <li>
                <strong>Lizenzlösung:</strong> DigiEmu als eigenständige Instanz/Domain für eine Organisation.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
