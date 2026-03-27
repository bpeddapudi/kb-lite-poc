/** @typedef {'light' | 'dark' | 'midnight' | 'blueprint'} ThemeId */

export const STORAGE_KEY = 'ioa-theme'

export const THEMES = /** @type {const} */ (['light', 'dark', 'midnight', 'blueprint'])

/** @param {string} value */
export function isThemeId(value) {
  return THEMES.includes(/** @type {ThemeId} */ (value))
}
