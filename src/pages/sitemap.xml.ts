import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const siteUrl = "https://quietbooklibrary.com";

  const bookFiles = import.meta.glob("../content/books/*.md", { eager: true });
  const categoryFiles = import.meta.glob("../content/categories/*.md", { eager: true });
  const skillFiles = import.meta.glob("../content/skills/*.md", { eager: true });
  const blogFiles = import.meta.glob("../content/blog/*.md", { eager: true });

  const books = Object.values(bookFiles).map((b: any) => b.frontmatter);
  const categories = Object.values(categoryFiles).map((c: any) => c.frontmatter);
  const skills = Object.values(skillFiles).map((s: any) => s.frontmatter);
  const posts = Object.values(blogFiles).map((p: any) => p.frontmatter);

  const urls = [
    `${siteUrl}/`,
    `${siteUrl}/quiet-books`,
    `${siteUrl}/categories`,
    `${siteUrl}/skills`,
    `${siteUrl}/blog`,
    `${siteUrl}/search`,
    `${siteUrl}/about`,
    ...books.map((b: any) => `${siteUrl}/quiet-book/${b.slug}`),
    ...categories.map((c: any) => `${siteUrl}/${c.slug}-quiet-books`),
    ...skills.map((s: any) => `${siteUrl}/${s.slug}-quiet-books`),
    ...posts.map((p: any) => `${siteUrl}/blog/${p.slug}`),
  ];

  const xml = urls
    .map(
      (url) => `  <url>\n    <loc>${url}</loc>\n  </url>`
    )
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xml}\n</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml",
      },
    }
  );
};
