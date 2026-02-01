import path from "path";
import { execSync } from "child_process";

/**
 * Returns ISO timestamp (string) for the last commit that touched the given file path.
 * If git is unavailable (e.g. CI shallow checkout), returns null.
 */
export function getGitLastUpdated(relFilePath: string): string | null {
  try {
    // Ensure forward slashes for git on Windows
    const normalized = relFilePath.split(path.sep).join("/");
    const out = execSync(`git log -1 --format=%cI -- "${normalized}"`, {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    return out || null;
  } catch {
    return null;
  }
}

export function formatDateCH(iso: string): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("de-CH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d);
  } catch {
    return iso;
  }
}
