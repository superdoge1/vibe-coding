import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lessons' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    phase: z.string(),
    order: z.number().int().positive(),
    estimatedMinutes: z.number().int().positive(),
    prerequisites: z.array(z.string()),
    outcomes: z.array(z.string()),
    sourceLinks: z.array(z.object({
      label: z.string(),
      url: z.url(),
      kind: z.enum(['primary', 'code', 'reference']),
    })),
  }),
});

export const collections = { lessons };
