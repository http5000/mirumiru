# CLAUDE.md — mirumiru-pro.com

## Projet
Site vitrine **de marque** de MiruMiru (perles de fruits / popping boba pour bubble tea).
Il remplace l'ancienne boutique Shopify : **plus aucune vente en ligne**. Les
professionnels s'approvisionnent via **Metro** ; les autres demandes (distribution,
export) passent par le formulaire de contact.

## Stack
- **Framework** : Astro 7, `output: 'static'`
- **Styles** : CSS vanilla, tokens dans `src/styles/global.css` (pas de Tailwind)
- **Contenu** : content collections Markdown (`src/content/blog/`)
- **Formulaire** : Cloudflare Pages Function `functions/api/contact.ts` → Resend
- **Deploy** : Cloudflare Pages, build `npm run build`, sortie `dist/`
- **Fonts** : Fredoka (titres) + Inter (corps), auto-hébergées dans `public/fonts/` (RGPD)

## Structure
```
src/
  data/site.ts          — coordonnées, mentions légales société, menu
  data/produits.ts      — 7 parfums de perles + 6 consommables packaging
  layouts/Base.astro    — head/SEO/OG, nav, footer, script reveal
  components/           — Nav, Footer, Marquee, ParfumCarte, ArticleCarte, EnteteePage
  content/blog/         — 31 articles migrés du blog Shopify
  content.config.ts     — schéma de la collection blog
  pages/
    index.astro                  /
    perles-de-fruits.astro       /perles-de-fruits
    packaging.astro              /packaging
    la-marque.astro              /la-marque
    ou-nous-trouver.astro        /ou-nous-trouver
    contact.astro                /contact
    faq.astro                    /faq
    blog/index.astro             /blog
    blogs/infos/[slug].astro     /blogs/infos/<slug>   <- URLs Shopify conservées
    mentions-legales.astro, politique-de-confidentialite.astro, 404.astro
    rss.xml.ts                   /rss.xml
functions/api/contact.ts         POST /api/contact
public/_redirects                301 depuis les anciennes URLs Shopify
public/_headers                  sécurité + cache
scripts/optimize-images.mjs      recompression des images de public/img
```

## Design tokens
- Encre panda : `--ink #17120F` · crème `--cream #FFFBF4`
- Signature : rose `--rose #FF5C8A` / `--rose-deep #E23A6C`
- Secondaires : `--mint #22C1B8`, `--mango #FFB13D`
- Un token de couleur par parfum (`--fraise`, `--mangue`, …) utilisé par `ParfumCarte`
- Principe : le panda est noir & blanc, **ce sont les perles qui apportent la couleur**

## Variables d'environnement (Cloudflare Pages)
| Nom | Rôle |
|-----|------|
| `RESEND_API_KEY` | clé API Resend (secret) — sans elle, `/api/contact` renvoie 503 |
| `CONTACT_TO` | destinataire interne (défaut `info@mirumiru.eu`) |
| `CONTACT_FROM` | expéditeur vérifié Resend (défaut `contact@mirumiru-pro.com`) |

## Points d'attention
- Le domaine pointe encore sur Shopify (`23.227.38.65`, DNS chez IONOS).
  La bascule se fait **après validation** sur l'URL `*.pages.dev`.
- Les URLs d'articles `/blogs/infos/<slug>` sont volontairement identiques à
  Shopify : ne pas les renommer, c'est tout le référencement acquis.
- Les images de `public/img/` sont servies telles quelles (pas d'optimisation
  Astro sur `public/`). Après tout ajout : `node scripts/optimize-images.mjs`.
