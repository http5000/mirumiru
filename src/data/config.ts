/**
 * Le site n'est référençable que si SITE_INDEXABLE vaut exactement "true".
 * Tant que le domaine n'a pas basculé de Shopify vers Cloudflare Pages, on
 * laisse la variable absente : la preview reste invisible des moteurs.
 */
export const indexable = process.env.SITE_INDEXABLE === 'true'
