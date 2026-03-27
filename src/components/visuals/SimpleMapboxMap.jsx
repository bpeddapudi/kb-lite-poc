import mapboxgl from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'

import 'mapbox-gl/dist/mapbox-gl.css'

import { getMapboxPublicToken, mapboxTokenHint } from '../../lib/mapbox-token.js'

/**
 * Minimal 2D map (mercator + zoom controls) to verify VITE_MAPBOX_TOKEN.
 */
export function SimpleMapboxMap() {
  const containerRef = useRef(null)
  const [error, setError] = useState(null)
  const token = getMapboxPublicToken()
  const rawEnv = import.meta.env.VITE_MAPBOX_TOKEN?.trim()

  useEffect(() => {
    if (!token || !containerRef.current) return

    mapboxgl.accessToken = token

    let map
    try {
      map = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-98, 39],
        zoom: 3,
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
    map.on('load', () => map.resize())

    return () => {
      window.removeEventListener('resize', onResize)
      try {
        map.remove()
      } catch {
        /* ignore */
      }
    }
  }, [token])

  if (!rawEnv) {
    return (
      <div className="flex min-h-[280px] items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
        Set <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-foreground">VITE_MAPBOX_TOKEN</code> in{' '}
        <code className="mx-1 rounded bg-muted px-1.5 py-0.5">.env</code> and restart the dev server.
      </div>
    )
  }

  if (!token) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-destructive">Invalid Mapbox token format</p>
        <p>
          Value must start with <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">pk.</code> (full public
          token from Mapbox). Yours looks truncated or missing the{' '}
          <code className="rounded bg-muted px-1.5 py-0.5">pk.</code> prefix.
        </p>
        <p className="text-xs">{mapboxTokenHint()}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
        {error}
      </div>
    )
  }

  return <div ref={containerRef} className="h-[min(50vh,420px)] w-full rounded-lg border border-border" />
}
