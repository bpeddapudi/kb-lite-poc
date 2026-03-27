/**
 * Mapbox **public** tokens always start with `pk.` (never commit secret `sk.` tokens to the client).
 * @returns {string | null}
 */
export function getMapboxPublicToken() {
  const raw = import.meta.env.VITE_MAPBOX_TOKEN?.trim()
  if (!raw) return null
  if (!raw.startsWith('pk.')) {
    return null
  }
  return raw
}

export function mapboxTokenHint() {
  return 'Use the full Default Public Token from Mapbox Account — it must start with pk. and be on one line in .env (restart npm run dev after edits).'
}
