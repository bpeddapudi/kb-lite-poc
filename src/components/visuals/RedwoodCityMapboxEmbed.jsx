import mapboxgl from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'

import 'mapbox-gl/dist/mapbox-gl.css'

import { getMapboxPublicToken, mapboxTokenHint } from '../../lib/mapbox-token.js'

/** Redwood City, CA — POC location for map preloader reveal */
const REDWOOD_CITY = { lng: -122.2361, lat: 37.4845, zoom: 13.5 }

const MAP_STYLES = {
  dark: 'mapbox://styles/mapbox/dark-v11',
  light: 'mapbox://styles/mapbox/light-v11',
}

/**
 * Mapbox GL map — mount only after preloader finishes so GL init happens when visible.
 * @param {{ className?: string, appearance?: 'dark' | 'light' }} props
 */
export function RedwoodCityMapboxEmbed({ className = '', appearance = 'dark' }) {
  const containerRef = useRef(null)
  const [error, setError] = useState(null)
  const rawEnv = import.meta.env.VITE_MAPBOX_TOKEN?.trim()
  const token = getMapboxPublicToken()
  const styleUrl = MAP_STYLES[appearance] ?? MAP_STYLES.dark

  useEffect(() => {
    if (!token || !containerRef.current) return

    mapboxgl.accessToken = token

    let map
    try {
      map = new mapboxgl.Map({
        container: containerRef.current,
        style: styleUrl,
        center: [REDWOOD_CITY.lng, REDWOOD_CITY.lat],
        zoom: REDWOOD_CITY.zoom,
        attributionControl: true,
      })
      map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), 'top-right')
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Map failed to initialize'
      queueMicrotask(() => setError(msg))
      return
    }

    map.on('error', (e) => {
      setError(e.error?.message ?? 'Map error')
    })

    const onResize = () => map.resize()
    window.addEventListener('resize', onResize)
    map.on('load', () => {
      map.resize()
    })

    return () => {
      window.removeEventListener('resize', onResize)
      try {
        map.remove()
      } catch {
        /* ignore */
      }
    }
  }, [token, styleUrl])

  if (!rawEnv) {
    return (
      <div className={`flex min-h-[200px] flex-1 items-center justify-center bg-[#0c1220] p-4 text-center text-xs text-white/60 ${className}`}>
        Set <code className="mx-1 rounded bg-white/10 px-1 font-mono text-white/90">VITE_MAPBOX_TOKEN</code> in{' '}
        <code className="rounded bg-white/10 px-1 font-mono">.env</code>
      </div>
    )
  }

  if (!token) {
    return (
      <div className={`flex min-h-[200px] flex-1 flex-col items-center justify-center gap-2 bg-[#0c1220] p-4 text-center text-xs text-white/70 ${className}`}>
        <p className="font-medium text-red-400">Invalid Mapbox token</p>
        <p>{mapboxTokenHint()}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`flex min-h-[200px] flex-1 items-center justify-center bg-[#0c1220] p-4 text-sm text-red-400 ${className}`}>{error}</div>
    )
  }

  return (
    <div className={`relative min-h-0 flex-1 ${className}`}>
      <div ref={containerRef} className="absolute inset-0 h-full min-h-[200px] w-full" />
      <p
        className={`pointer-events-none absolute bottom-10 left-3 z-10 rounded px-2 py-1 text-[10px] backdrop-blur-sm ${
          appearance === 'light'
            ? 'bg-white/85 text-slate-600 shadow-sm ring-1 ring-slate-200/80'
            : 'bg-black/50 text-white/70'
        }`}
      >
        Redwood City, CA · Mapbox GL
      </p>
    </div>
  )
}
