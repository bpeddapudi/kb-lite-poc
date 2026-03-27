import { useCallback, useEffect, useMemo, useState } from 'react'

import { STORAGE_KEY, THEMES, isThemeId } from '../config/theme.js'

import { ThemeContext } from './theme-context.js'

function readTheme() {
  if (typeof document === 'undefined') return 'dark'
  const fromDom = document.documentElement.getAttribute('data-theme')
  if (fromDom && isThemeId(fromDom)) {
    return fromDom
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && isThemeId(stored)) {
      return stored
    }
  } catch {
    /* ignore */
  }
  return 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return
      if (isThemeId(e.newValue)) {
        setThemeState(e.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const setTheme = useCallback((next) => {
    if (!isThemeId(next)) return
    setThemeState(next)
  }, [])

  const value = useMemo(() => ({ theme, setTheme, themes: THEMES }), [theme, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
