/**
 * Génère l'image Open Graph (1200×630) et l'icône carrée (512×512) à partir
 * du visuel de marque. À relancer si le logo ou le visuel hero changent :
 *   node scripts/generate-brand-assets.mjs
 */
import sharp from 'sharp'
import path from 'node:path'

const BRAND = path.resolve('public/img/brand')
const CREME = { r: 255, g: 251, b: 244, alpha: 1 }

// --- Open Graph : le hero recadré + une pastille logo en bas à gauche ---
const fond = await sharp(path.join(BRAND, 'hero-bubble.png'))
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .toBuffer()

const logoOg = await sharp(path.join(BRAND, 'logo.webp'))
  .resize({ height: 96, fit: 'inside' })
  .toBuffer()
const { width: lw } = await sharp(logoOg).metadata()

const pw = (lw ?? 110) + 72
const ph = 156
const fondPastille = Buffer.from(
  `<svg width="${pw}" height="${ph}" xmlns="http://www.w3.org/2000/svg">
     <rect width="${pw}" height="${ph}" rx="34" fill="#FFFBF4"/>
   </svg>`,
)
const pastille = await sharp(fondPastille)
  .composite([{ input: logoOg, gravity: 'center' }])
  .png()
  .toBuffer()

await sharp(fond)
  .composite([{ input: pastille, top: 630 - ph - 40, left: 40 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join(BRAND, 'og.jpg'))

// --- Icône carrée (apple-touch-icon) : logo centré sur crème ---
const logoIcone = await sharp(path.join(BRAND, 'logo.webp'))
  .resize({ width: 380, fit: 'inside' })
  .toBuffer()

await sharp({ create: { width: 512, height: 512, channels: 4, background: CREME } })
  .composite([{ input: logoIcone, gravity: 'center' }])
  .png()
  .toFile(path.join(BRAND, 'icone-512.png'))

console.log('og.jpg + icone-512.png générés')
