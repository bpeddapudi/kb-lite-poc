/**
 * Mapbox **public** token (`pk.…`) — set via `VITE_MAPBOX_TOKEN` in `.env` (local) or CI env (never commit
 * the value). Restrict usage by URL in Mapbox account settings. Never use a secret `sk.` token in the client.
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
  return 'Add VITE_MAPBOX_TOKEN (public pk. token) to .env and restart the dev server. For GitHub Pages, set the same name as a repository Actions secret.'
}
