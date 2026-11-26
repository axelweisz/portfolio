import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One folder per project: src/content/projects/<slug>/index.md (+ images)
const projects = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.union([z.number(), z.string()]).optional(), // kept for your records; not shown on the site
      status: z.enum(['archived', 'active', 'paused', 'idea']).default('archived'),
      order: z.number().default(100), // lower = earlier in the grid
      role: z.string().optional(),
      client: z.string().optional(),
      credits: z.string().optional(),
      award: z.string().optional(),
      tools: z.array(z.string()).default([]),
      cover: image(),
      coverRoll: image().optional(), // shown on hover in the grid
      poster: image().optional(), // still shown before the video loads
      video: z.string().optional(), // Vimeo/YouTube URL or /media/file.mp4
      moreVideos: z.array(z.object({ src: z.string(), title: z.string() })).default([]), // extra clips below the text
      demo: z.string().optional(), // e.g. /demos/<slug>/index.html (Unity WebGL)
      demoAspect: z.string().default('16 / 10'), // shape of the game frame, e.g. '16 / 9'
      demoHint: z.string().optional(), // small line under the Play button
      links: z.object({ repo: z.string().optional(), site: z.string().optional() }).default({}),
      draft: z.boolean().default(false),
    }),
});

// One file per progress post: src/content/logs/YYYY-MM-DD-title.md
const logs = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/logs' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    project: z.string().optional(), // slug of a project folder
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, logs };
