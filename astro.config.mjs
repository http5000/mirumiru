// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

/**
 * Indexation : mirumiru-pro.com est le seul domaine de référence.
 * L'URL de travail *.pages.dev est exclue par public/_headers
 * (X-Robots-Tag: noindex sur https://:project.pages.dev/*) et par la balise
 * robots injectée dans Base.astro. Ne plus bloquer robots.txt globalement :
 * c'est ce verrou qui empêchait Google de lire le site en production.
 */

export default defineConfig({
  site: 'https://mirumiru-pro.com',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { format: 'directory' },
})
