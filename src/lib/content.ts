import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type ContentPage = {
  section: string;
  slug: string;
  title: string;
  description: string;
  html: string;
  url: string;
};

export function getAllSlugs(): { section: string; slug: string }[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const sections = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const result: { section: string; slug: string }[] = [];

  for (const section of sections) {
    const dir = path.join(CONTENT_DIR, section);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    for (const f of files) {
      result.push({ section, slug: f.replace(/\.md$/, "") });
    }
  }

  return result;
}

export async function getPage(section: string, slug: string): Promise<ContentPage | null> {
  const filePath = path.join(CONTENT_DIR, section, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(html).process(content);
  const htmlString = processed.toString();

  const title = String(data.title ?? "");
  const description = String(data.description ?? "");

  if (!title || !description) {
    throw new Error(`Missing frontmatter title/description in ${section}/${slug}.md`);
  }

  return {
    section,
    slug,
    title,
    description,
    html: htmlString,
    url: `/${section}/${slug}`,
  };
}
