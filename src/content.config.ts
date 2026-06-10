import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/(?:\/index)?\.mdx?$/, ''),
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        draft: z.boolean().optional().default(false),
        hero: image().optional(),
        heroAlt: z.string().optional(),
      })
      .refine((data) => !data.hero || (data.heroAlt && data.heroAlt.length > 0), {
        message: 'heroAlt is required when hero is set',
        path: ['heroAlt'],
      }),
});

export const collections = { blog };
