/** Décode les entités HTML héritées de l'export Shopify (&amp;, &#39;…). */
function decode(s: string): string {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, '’')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

/** Meta description propre : texte décodé, ≤ 158 caractères, coupé sur un mot. */
export function metaDescription(texte: string, max = 158): string {
  const t = decode(texte).replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  // Préfère une fin de phrase si elle laisse au moins 90 caractères.
  const phrase = t.slice(0, max).match(/^(.{90,}[.!?])\s/)
  if (phrase) return phrase[1]
  const coupe = t.slice(0, max - 1)
  return coupe.slice(0, coupe.lastIndexOf(' ')).replace(/[\s,;:–-]+$/, '') + '…'
}
