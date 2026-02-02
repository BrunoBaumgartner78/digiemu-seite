import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");

const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://digiemu.ch").replace(/\/$/, "");
const url = new URL(base);

const manifest = {
  name: "DigiEmu",
  short_name: "DigiEmu",
  description: "Modulare Plattform für digitale Produkte – Marktplatz oder Lizenz-/Custom-Lösung.",
  start_url: `${url.origin}/`,
  scope: `${url.origin}/`,
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#ffffff",
  icons: [
    { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
  ]
};

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "site.webmanifest"), JSON.stringify(manifest, null, 2), "utf8");
console.log(`[manifest] generated site.webmanifest for base=${base}`);
