import type { ReactNode } from "react";

export default function UseCasesRootLayout({ children }: { children: ReactNode }) {
  return (
    <main className="container pageShell">
      <div className="pageContent">{children}</div>
    </main>
  );
}
