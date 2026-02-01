import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type PageMeta = {
	section: string;
	slug: string;
	title: string;
	description: string;
	url: string;
	order?: number;
};

export type ContentPage = PageMeta & {
	html: string;
};

function readMdFileMeta(filePath: string) {
	const raw = fs.readFileSync(filePath, "utf8");
	const { data } = matter(raw);

	const title = String(data.title ?? "");
	const description = String(data.description ?? "");
	const orderRaw = data.order;

	if (!title || !description) {
		throw new Error(`Missing frontmatter title/description in ${filePath}`);
	}

	let order: number | undefined = undefined;
	if (typeof orderRaw === "number") order = orderRaw;
	if (typeof orderRaw === "string" && orderRaw.trim() !== "" && !Number.isNaN(Number(orderRaw))) {
		order = Number(orderRaw);
	}

	return { title, description, order };
}

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

export function getAllPagesMeta(section?: string): PageMeta[] {
	const slugs = getAllSlugs();
	const filtered = section ? slugs.filter((s) => s.section === section) : slugs;

	const metas: PageMeta[] = filtered.map(({ section, slug }) => {
		const filePath = path.join(CONTENT_DIR, section, `${slug}.md`);
		const meta = readMdFileMeta(filePath);
		return {
			section,
			slug,
			title: meta.title,
			description: meta.description,
			order: meta.order,
			url: `/${section}/${slug}`,
		};
	});

	// Sort: order ASC (undefined last), then title ASC
	metas.sort((a, b) => {
		const ao = typeof a.order === "number" ? a.order : Number.POSITIVE_INFINITY;
		const bo = typeof b.order === "number" ? b.order : Number.POSITIVE_INFINITY;
		if (ao !== bo) return ao - bo;
		return a.title.localeCompare(b.title, "de");
	});

	return metas;
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
	const orderRaw = data.order;

	if (!title || !description) {
		throw new Error(`Missing frontmatter title/description in ${section}/${slug}.md`);
	}

	let order: number | undefined = undefined;
	if (typeof orderRaw === "number") order = orderRaw;
	if (typeof orderRaw === "string" && orderRaw.trim() !== "" && !Number.isNaN(Number(orderRaw))) {
		order = Number(orderRaw);
	}

	return {
		section,
		slug,
		title,
		description,
		order,
		html: htmlString,
		url: `/${section}/${slug}`,
	};
}

