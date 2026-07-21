import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const books = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/books" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    theme: z.string(),
    difficulty: z.enum(["Easy", "Medium", "Advanced"]),
    skills: z.array(z.string()),
    pages: z.number(),
    cover: z.string(),
    pdf: z.string().optional(),
    description: z.string().optional(),
    images: z.array(z.string()).optional(),
    activities: z.array(z.object({
      name: z.string(),
      type: z.string(),
      difficulty: z.enum(["Easy", "Medium", "Advanced"]),
      skill: z.string(),
      description: z.string().optional(),
    })).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/categories" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    image: z.string(),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/skills" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { books, categories, skills, blog };
