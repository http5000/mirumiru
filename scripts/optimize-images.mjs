import sharp from 'sharp'
import { readdir, stat, rename, unlink } from 'node:fs/promises'
import path from 'node:path'

const ROOT = '/root/projets/mirumiru-site/public/img'
const MAX_W = 1400

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) yield* walk(p)
    else yield p
  }
}

let before = 0, after = 0, n = 0
for await (const file of walk(ROOT)) {
  const ext = path.extname(file).toLowerCase()
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue
  const sizeBefore = (await stat(file)).size
  const tmp = file + '.tmp'
  try {
    let img = sharp(file).rotate()
    const meta = await img.metadata()
    if ((meta.width ?? 0) > MAX_W) img = img.resize({ width: MAX_W, withoutEnlargement: true })
    if (ext === '.png') await img.png({ quality: 82, compressionLevel: 9, palette: true }).toFile(tmp)
    else if (ext === '.webp') await img.webp({ quality: 80 }).toFile(tmp)
    else await img.jpeg({ quality: 80, mozjpeg: true }).toFile(tmp)
    const sizeAfter = (await stat(tmp)).size
    if (sizeAfter < sizeBefore) { await rename(tmp, file); after += sizeAfter }
    else { await unlink(tmp); after += sizeBefore }
    before += sizeBefore
    n++
  } catch (e) {
    console.log('skip', file, e.message)
    try { await unlink(tmp) } catch {}
  }
}
console.log(`${n} images — ${(before / 1e6).toFixed(1)} Mo -> ${(after / 1e6).toFixed(1)} Mo`)
