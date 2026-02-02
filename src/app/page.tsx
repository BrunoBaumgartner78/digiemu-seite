import Link from "next/link";
import PageShell from "@/components/ui/PageShell";

export default function HomePage() {
  return (
    <PageShell
      kicker="DigiEmu beta"
      title="DigiEmu"
      lead="Modulare Plattform für digitale Produkte – Marktplatz oder Lizenz-/Custom-Lösung."
      actions={
        <>
          <Link className="btn btn-primary" href="/product">Produkt ansehen</Link>
          <Link className="btn" href="/docs">Docs öffnen</Link>
          <Link className="btn" href="/use-cases">Use-Cases</Link>
        </>
      }
    >
      <p>
        DigiEmu ist darauf ausgelegt, digitale Inhalte langfristig strukturiert bereitzustellen:
        nachvollziehbar, wartbar und ohne unnötige Plattformabhängigkeit.
      </p>
      <hr />
      <p>
        Startpunkte:
        <br />→ <a href="/municipalities">Gemeinden</a>
        <br />→ <a href="/use-cases">Use-Cases</a>
        <br />→ <a href="/product">Produktübersicht</a>
      </p>
    </PageShell>
  );
}
