/** Valeurs nutritionnelles pour 100 g. Optionnelles tant que la fiche
 *  technique n'a pas été fournie — la page les affiche seulement si présentes. */
export type Nutrition = {
  energieKj?: string
  energieKcal?: string
  matieresGrasses?: string
  acidesGrasSatures?: string
  glucides?: string
  sucres?: string
  fibres?: string
  proteines?: string
  sel?: string
}

/** Valeurs nutritionnelles pour 100 g, communes à toute la gamme popping boba. */
export const nutritionCommune: Nutrition = {
  energieKj: '419 kJ',
  energieKcal: '100 kcal',
  matieresGrasses: '0,0 g',
  acidesGrasSatures: '0,0 g',
  glucides: '25,0 g',
  sucres: '24,0 g',
  fibres: '0 g',
  proteines: '0 g',
  sel: '0 g',
}

export type Parfum = {
  slug: string
  nom: string
  couleur: string
  image: string
  note: string
  accord: string
  /** Liste d'ingrédients complète (source fabricant Possmei). */
  ingredients: string
  nutrition?: Nutrition
}

/** Informations communes à tous les parfums (fabricant, conditionnement…). */
export const ficheProduit = {
  origine: 'Taïwan',
  dlc: '18 mois — date de péremption indiquée sur l’emballage',
  conservation:
    'À conserver dans un endroit frais et sec. Après ouverture, conserver au réfrigérateur et consommer rapidement.',
  conditionnement: 'Seau de 3,1 kg (2,2 kg net égoutté), par carton de 4 seaux.',
  usage:
    'Prêt à l’emploi : une cuillère dans un thé, un smoothie ou un dessert glacé. Se marie aussi avec les gelées et autres toppings.',
  avertissement:
    'Petites billes : ne pas donner aux enfants de moins de 3 ans. De 4 à 7 ans, sous la surveillance d’un adulte.',
} as const

/** Les 7 parfums de popping boba MiruMiru. */
export const parfums: Parfum[] = [
  {
    slug: 'fraise',
    nom: 'Fraise',
    couleur: 'var(--fraise)',
    image: '/img/produits/perles-fraise.webp',
    note: 'La valeur sûre. Ronde, sucrée, immédiatement reconnaissable : c’est le parfum qui fait entrer les nouveaux clients dans le bubble tea.',
    accord: 'Thé au jasmin, thé vert, lait',
    ingredients:
      'Eau, fructose, lactate de calcium (E327), alginate de sodium (E401), acétate d’amidon (E1420), gomme xanthane (E415), acide DL-malique (E296), arôme fraise, sorbate de potassium (conservateur, E202), rouge allura AC (E129).',
  },
  {
    slug: 'mangue',
    nom: 'Mangue',
    couleur: 'var(--mangue)',
    image: '/img/produits/perles-mangue.webp',
    note: 'Solaire et gourmande. Sa couleur ambrée illumine le gobelet, un vrai atout en vitrine et sur les photos.',
    accord: 'Thé oolong, thé noir, nectar de passion',
    ingredients:
      'Eau, fructose, lactate de calcium (E327), alginate de sodium (E401), acétate d’amidon (E1420), arôme mangue, gomme xanthane (E415), acide DL-malique (E296), sorbate de potassium (conservateur, E202), tartrazine (E102), rouge allura AC (E129).',
  },
  {
    slug: 'litchi',
    nom: 'Litchi',
    couleur: 'var(--litchi)',
    image: '/img/produits/perles-litchi.webp',
    note: 'Florale et délicate, la signature asiatique. Elle donne au bubble tea son caractère parfumé sans écraser le thé.',
    accord: 'Thé au jasmin, thé vert, fraise',
    ingredients:
      'Eau, fructose, lactate de calcium (E327), alginate de sodium (E401), acétate d’amidon (E1420), arôme litchi, acide DL-malique (E296), gomme xanthane (E415), sorbate de potassium (conservateur, E202). Sans colorant ajouté.',
  },
  {
    slug: 'fruit-de-la-passion',
    nom: 'Fruit de la passion',
    couleur: 'var(--passion)',
    image: '/img/produits/perles-passion.webp',
    note: 'Acidulée, franche, celle qui réveille une recette. Parfaite pour équilibrer un thé au lait un peu sucré.',
    accord: 'Thé oolong, mangue, thé glacé',
    ingredients:
      'Eau, fructose, lactate de calcium (E327), alginate de sodium (E401), acétate d’amidon (E1420), arôme fruit de la passion, gomme xanthane (E415), acide DL-malique (E296), sorbate de potassium (conservateur, E202), tartrazine (E102), rouge allura AC (E129).',
  },
  {
    slug: 'pomme-verte',
    nom: 'Pomme verte',
    couleur: 'var(--pomme)',
    image: '/img/produits/perles-pomme-verte.webp',
    note: 'Vive et croquante en bouche. Son vert éclatant tranche avec les autres parfums : l’effet visuel est garanti.',
    accord: 'Thé vert, thé au jasmin, fraise',
    ingredients:
      'Eau, fructose, lactate de calcium (E327), alginate de sodium (E401), acétate d’amidon (E1420), arôme pomme verte, gomme xanthane (E415), acide DL-malique (E296), sorbate de potassium (conservateur, E202), tartrazine (E102), bleu brillant FCF (E133).',
  },
  {
    slug: 'peche',
    nom: 'Pêche',
    couleur: 'var(--peche)',
    image: '/img/produits/perles-peche.webp',
    note: 'Douce et veloutée, la plus consensuelle. Un excellent premier bubble tea pour une clientèle qui découvre.',
    accord: 'Thé noir, thé oolong, lait',
    ingredients:
      'Eau, fructose, lactate de calcium (E327), alginate de sodium (E401), acétate d’amidon (E1420), arôme pêche, gomme xanthane (E415), acide DL-malique (E296), sorbate de potassium (conservateur, E202), tartrazine (E102), rouge allura AC (E129).',
  },
  {
    slug: 'framboise',
    nom: 'Framboise',
    couleur: 'var(--framboise)',
    image: '/img/produits/perles-framboise.webp',
    note: 'Intense et légèrement acidulée. Son rouge profond donne des boissons très photogéniques.',
    accord: 'Thé vert, citronnade, lait',
    ingredients:
      'Eau, fructose, lactate de calcium (E327), alginate de sodium (E401), acétate d’amidon (E1420), gomme xanthane (E415), acide DL-malique (E296), arôme framboise, sorbate de potassium (conservateur, E202), rouge allura AC (E129), bleu brillant FCF (E133).',
  },
]

export type Consommable = {
  nom: string
  image: string
  detail: string
  specs: string[]
}

export const packaging: Consommable[] = [
  {
    nom: 'Gobelet scellable 360 ml',
    image: '/img/produits/gobelet-360.jpg',
    detail: 'Le format dégustation, idéal pour les corners, les événements et les cartes enfants.',
    specs: ['Polypropylène (PP)', 'Diamètre 95 mm', 'Compatible machine à sceller'],
  },
  {
    nom: 'Gobelet scellable 500 ml',
    image: '/img/produits/gobelet-500.jpg',
    detail: 'Le format standard du bubble tea, celui que la majorité des établissements servent au quotidien.',
    specs: ['Polypropylène (PP)', 'Diamètre 95 mm', 'Compatible machine à sceller'],
  },
  {
    nom: 'Gobelet scellable 700 ml',
    image: '/img/produits/gobelet-700.jpg',
    detail: 'Le grand format, pour les recettes généreuses en glace et en perles.',
    specs: ['Polypropylène (PP)', 'Diamètre 95 mm', 'Compatible machine à sceller'],
  },
  {
    nom: 'Film de scellage',
    image: '/img/produits/film-scellage.jpg',
    detail: 'Film transparent thermorétractable, en rouleau. Un rouleau scelle jusqu’à 2 500 gobelets.',
    specs: ['Transparent', 'Jusqu’à 2 500 scellages', 'Compatible PE / PP / PET'],
  },
  {
    nom: 'Machine à sceller manuelle',
    image: '/img/produits/machine-sceller.jpg',
    detail: 'Scellage en quelques secondes, jusqu’à 500 boissons par heure. Plateau réglable pour plusieurs formats.',
    specs: ['Acier au carbone', 'Gobelets Ø 90 et 95 mm', '27 × 27 × 65 cm, 8,5 kg'],
  },
  {
    nom: 'Pailles bambou emballées',
    image: '/img/produits/pailles-bambou.png',
    detail: 'Pailles larges 100 % biodégradables, emballées individuellement pour un service en salle irréprochable.',
    specs: ['Ø 12 mm, 23 cm', 'Emballage individuel', 'Boissons froides'],
  },
]
