/**
 * Cloudflare Pages Function — POST /api/contact
 * Envoie la demande par email via Resend, puis un accusé de réception au visiteur.
 *
 * Variables d'environnement (Cloudflare Pages > Settings > Environment variables) :
 *   RESEND_API_KEY  — clé API Resend (secret)
 *   CONTACT_TO      — destinataire interne      (défaut : info@mirumiru.eu)
 *   CONTACT_FROM    — expéditeur vérifié Resend (défaut : contact@mirumiru-pro.com)
 */

interface Env {
  RESEND_API_KEY: string
  CONTACT_TO?: string
  CONTACT_FROM?: string
}

interface Corps {
  nom?: string
  societe?: string
  email?: string
  telephone?: string
  sujet?: string
  message?: string
  consentement?: string
  site_web?: string // piège à robots
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

/** Neutralise le HTML avant réinjection dans un email. */
const echapper = (v = '') =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const estEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

export const onRequestPost: (ctx: { request: Request; env: Env }) => Promise<Response> = async ({
  request,
  env,
}) => {
  let corps: Corps
  try {
    corps = (await request.json()) as Corps
  } catch {
    return json({ error: 'Requête invalide' }, 400)
  }

  // Un robot a rempli le champ caché : on répond OK sans rien envoyer.
  if (corps.site_web) return json({ ok: true })

  const nom = (corps.nom ?? '').trim().slice(0, 120)
  const email = (corps.email ?? '').trim().slice(0, 160)
  const message = (corps.message ?? '').trim().slice(0, 5000)

  if (!nom || !email || !message) return json({ error: 'Champs requis manquants' }, 400)
  if (!estEmail(email)) return json({ error: 'Email invalide' }, 400)
  if (!env.RESEND_API_KEY) return json({ error: 'Service indisponible' }, 503)

  const societe = (corps.societe ?? '').trim().slice(0, 160)
  const telephone = (corps.telephone ?? '').trim().slice(0, 40)
  const sujet = (corps.sujet ?? 'Autre').trim().slice(0, 120)

  const destinataire = env.CONTACT_TO ?? 'info@mirumiru.eu'
  const expediteur = env.CONTACT_FROM ?? 'MiruMiru <contact@mirumiru-pro.com>'

  const envoyer = async (payload: Record<string, unknown>) => {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`)
  }

  try {
    await envoyer({
      from: expediteur,
      to: destinataire,
      reply_to: email,
      subject: `[mirumiru-pro.com] ${sujet} — ${nom}`,
      html: `
        <h2>Nouvelle demande depuis mirumiru-pro.com</h2>
        <p><strong>Nom :</strong> ${echapper(nom)}</p>
        <p><strong>Société :</strong> ${echapper(societe) || '—'}</p>
        <p><strong>Email :</strong> ${echapper(email)}</p>
        <p><strong>Téléphone :</strong> ${echapper(telephone) || '—'}</p>
        <p><strong>Sujet :</strong> ${echapper(sujet)}</p>
        <p><strong>Message :</strong></p>
        <blockquote style="border-left:3px solid #FF5C8A;padding-left:12px;margin:0">
          ${echapper(message).replace(/\n/g, '<br>')}
        </blockquote>
      `,
    })

    await envoyer({
      from: expediteur,
      to: email,
      subject: 'Votre message a bien été reçu — MiruMiru',
      html: `
        <p>Bonjour ${echapper(nom)},</p>
        <p>Nous avons bien reçu votre message et nous vous répondrons sous 24 heures ouvrées.</p>
        <p>Si votre demande est urgente, appelez-nous au <strong>04 85 88 02 73</strong>.</p>
        <p>À très vite,<br>L'équipe MiruMiru</p>
        <hr style="border:0;border-top:1px solid #EDE3D6;margin:24px 0">
        <p style="color:#7C736D;font-size:13px">Rappel de votre message :</p>
        <blockquote style="border-left:3px solid #EDE3D6;padding-left:12px;margin:0;color:#7C736D;font-size:13px">
          ${echapper(message).replace(/\n/g, '<br>')}
        </blockquote>
      `,
    })

    return json({ ok: true })
  } catch (err) {
    console.error('contact:', err instanceof Error ? err.message : err)
    return json({ error: "L'envoi a échoué" }, 502)
  }
}
