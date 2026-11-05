import { getCollection } from 'astro:content'
import { parfums } from '../data/produits'
import { site } from '../data/site'

/** /llms.txt : résumé du site pour les moteurs de réponse IA (GEO). */
export async function GET() {
  const articles = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  )
  const u = (p: string) => `${site.url}${p}`
  const lignes = [
    '# MiruMiru',
    '',
    '> MiruMiru est une marque française (Lyon) de popping boba, aussi appelé perles de fruits : de petites billes à fine membrane végétale et au cœur liquide aromatisé, pour bubble tea, desserts et boissons. Fabriqué à Taïwan. Le site ne vend pas en ligne : les professionnels s’approvisionnent chez Metro France ; distribution et export sur demande.',
    '',
    `Conditionnement : seau de 3,1 kg (2,2 kg net égoutté), carton de 4 seaux. Parfums : ${parfums.map((p) => p.nom.toLowerCase()).join(', ')}.`,
    '',
    '## Pages principales',
    `- [Perles de fruits (gamme)](${u('/perles-de-fruits')}) : tous les parfums, fiche produit commune`,
    `- [Où nous trouver](${u('/ou-nous-trouver')}) : approvisionnement chez Metro, distribution, export`,
    `- [La marque](${u('/la-marque')}) : histoire et métier de MiruMiru`,
    `- [FAQ](${u('/faq')}) : questions fréquentes`,
    `- [Contact](${u('/contact')})`,
    '',
    '## Fiches parfum',
    ...parfums.map((p) => `- [Popping boba ${p.nom}](${u(`/perles-de-fruits/${p.slug}`)}) : ingrédients, conservation, valeurs nutritionnelles`),
    '',
    '## Blog',
    ...articles.map((a) => `- [${a.data.title}](${u(`/blogs/infos/${a.id}`)})`),
    '',
  ]
  return new Response(lignes.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
