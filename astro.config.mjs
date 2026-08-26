// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import { appendFile, writeFile } from 'node:fs/promises'

const indexable = process.env.SITE_INDEXABLE === 'true'

/**
 * Tant que le site n'est pas indexable, on écrase robots.txt et on ajoute
 * un X-Robots-Tag global — la preview *.pages.dev reste hors des moteurs.
 * Pour lever le verrou : SITE_INDEXABLE=true dans Cloudflare Pages.
 */
/** @returns {import('astro').AstroIntegration} */
function verrouIndexation() {
  return {
    name: 'mirumiru:verrou-indexation',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        if (indexable) {
          logger.info('indexation autorisée (SITE_INDEXABLE=true)')
          return
        }
        const racine = new URL('./', dir)
        await writeFile(
          new URL('robots.txt', racine),
          'User-agent: *\nDisallow: /\n',
          'utf8',
        )
        await appendFile(
          new URL('_headers', racine),
          '\n/*\n  X-Robots-Tag: noindex, nofollow\n',
          'utf8',
        )
        logger.warn('site NON indexable : robots.txt en Disallow + X-Robots-Tag noindex')
      },
    },
  }
}

export default defineConfig({
  site: 'https://mirumiru-pro.com',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap(), verrouIndexation()],
  build: { format: 'directory' },
})
