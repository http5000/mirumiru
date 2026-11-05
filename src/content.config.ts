import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    pubDate: z.coerce.date(),
    author: z.string().default('MiruMiru'),
    cover: z.string().optional(),
    /** Texte alternatif de la couverture. */
    coverAlt: z.string().optional(),
    updated: z.coerce.date().optional(),
    /** Réponse courte en tête d'article (« En bref »), pensée pour les moteurs IA. */
    resume: z.string().optional(),
    faq: z.array(z.object({ q: z.string(), r: z.string() })).optional(),
    sources: z.array(z.object({ titre: z.string(), url: z.string().url() })).optional(),
  }),
})

export const collections = { blog }
