# mirumiru-pro.com

Site vitrine de la marque **MiruMiru** — perles de fruits (popping boba) et
consommables pour bubble tea.

## Développer

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
npm run preview
```

## Déploiement — Cloudflare Pages

| Réglage | Valeur |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 22 |

Variables d'environnement à créer côté Cloudflare : `RESEND_API_KEY`
(et si besoin `CONTACT_TO`, `CONTACT_FROM`).

Le formulaire de contact est servi par la Pages Function `functions/api/contact.ts`.

## Contenu

Les 31 articles du blog vivent dans `src/content/blog/*.md`. Pour en ajouter un,
créer un fichier avec ce frontmatter :

```yaml
---
title: "Titre de l'article"
description: "Résumé affiché dans les listes et les moteurs de recherche."
pubDate: 2026-01-15
author: "MiruMiru"
cover: "/img/blog/mon-image.jpg"
---
```

Voir `CLAUDE.md` pour l'architecture détaillée.
