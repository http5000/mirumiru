export const site = {
  nom: 'MiruMiru',
  baseline: 'Fournisseur de bubble tea',
  url: 'https://mirumiru-pro.com',
  tel: '+33 (0)4 85 88 02 73',
  telHref: '+33485880273',
  email: 'info@mirumiru.eu',
  siege: '3 rue Passet, 69007 Lyon',
} as const

/** Mentions légales — société éditrice. */
export const societe = {
  raison: 'http5000',
  forme: 'S.A.R.L. au capital de 15 000 €',
  rcs: 'RCS Lyon 431 903 376',
  ape: '7311Z',
  tva: 'FR48431903376',
  adresse: '3 rue Passet, 69007 Lyon, France',
  telSociete: '04 72 73 19 08',
  directeurPublication: 'Maximilien Haibi',
} as const

export const nav = [
  { href: '/perles-de-fruits', label: 'Perles de fruits' },
  { href: '/packaging', label: 'Packaging' },
  { href: '/la-marque', label: 'La marque' },
  { href: '/ou-nous-trouver', label: 'Où nous trouver' },
  { href: '/blog', label: 'Blog' },
] as const
