import Link from "next/link";

function CardItem({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="card" style={{ display: "block" }}>
      <div className="stack">
        <p className="cardTitle" style={{ margin: 0 }}>{title}</p>
        <p className="cardText">{desc}</p>
      </div>
    </Link>
  );
}

export default function UseCasesPage() {
  return (
    <>
      <header className="pageHeader">
        <p className="pageKicker">Use-Cases</p>
        <h1 className="pageTitle">Einsatzszenarien für DigiEmu</h1>
        <p className="pageLead">Von Creator bis Gemeinde – klare Szenarien, gleiche Infrastruktur.</p>
      </header>

      <section className="section">
        <div className="stackLoose">
          <CardItem title="Pilotprojekt DigiEmu für Gemeinden" desc="Risikoarmer Testbetrieb zur Prüfung einer langfristigen Informationsinfrastruktur." href="/use-cases/pilot" />
          <CardItem title="Bildung" desc="Digitale Inhalte für Schulen, Kurse und Weiterbildung." href="/use-cases/education" />
          <CardItem title="Creator" desc="Direkter Verkauf digitaler Produkte für Creator und Autoren." href="/use-cases/creator" />
          <CardItem title="Events" desc="Digitale Inhalte und Materialien für Events." href="/use-cases/events" />
          <CardItem title="Gemeinden" desc="Informationsinfrastruktur für Gemeinden und Behörden." href="/use-cases/municipalities" />
          <CardItem title="Organisationen" desc="Digitale Inhalte kontrolliert bereitstellen (NGOs/Organisationen)." href="/use-cases/organizations" />
        </div>
      </section>
    </>
  );
}
