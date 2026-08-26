import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const articles = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  )

  return rss({
    title: 'MiruMiru — le journal',
    description:
      'Recettes de bubble tea, tendances du marché et conseils aux professionnels, par MiruMiru.',
    site: context.site!,
    trailingSlash: false,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.pubDate,
      link: `/blogs/infos/${a.id}`,
    })),
    customData: '<language>fr-FR</language>',
  })
}
