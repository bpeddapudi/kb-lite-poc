import mapboxgl from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'

import 'mapbox-gl/dist/mapbox-gl.css'

import { getMapboxPublicToken } from '../../lib/mapbox-token.js'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card.jsx'

export function MapboxPreview() {
  const containerRef = useRef(null)
  const [error, setError] = useState(null)

  const token = getMapboxPublicToken()

  useEffect(() => {
    if (!token || !containerRef.current) return

    mapboxgl.accessToken = token

    let map
    try {
      map = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        projection: 'globe',
        center: [-40, 28],
        zoom: 1.35,
        pitch: 42,
        bearing: 0,
        antialias: true,
      })
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Map failed to initialize'
      queueMicrotask(() => setError(msg))
      return
    }

    map.on('error', (e) => {
      setError(e.error?.message ?? 'Map error')
    })

    map.on('load', () => {
      map.resize()
      try {
        map.setFog({
          range: [0.8, 2],
          color: 'rgb(12, 12, 24)',
          'horizon-blend': 0.08,
          'high-color': 'rgb(36, 92, 223)',
          'space-color': 'rgb(8, 8, 16)',
          'star-intensity': 0.35,
        })
      } catch {
        /* older style support */
      }
    })

    const spin = window.setInterval(() => {
      const b = map.getBearing()
      map.easeTo({ bearing: b + 0.15, duration: 1200, easing: (t) => t })
    }, 1200)

    const onResize = () => map.resize()
    window.addEventListener('resize', onResize)

    return () => {
      window.clearInterval(spin)
      window.removeEventListener('resize', onResize)
      try {
        map.remove()
      } catch {
        /* ignore */
      }
    }
  }, [token])

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Mapbox (globe)</CardTitle>
        <CardDescription>
          Dark style, globe projection, fog / starry atmosphere, slow rotation.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {!token ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 border-t border-border bg-muted/30 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Set <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">VITE_MAPBOX_TOKEN</code> (public{' '}
              <code className="rounded bg-muted px-1.5 py-0.5">pk.</code> token) in <code className="rounded bg-muted px-1.5 py-0.5">.env</code> and restart the dev server.
            </p>
          </div>
        ) : (
          <>
            {error ? (
              <p className="border-t border-border px-6 py-3 text-sm text-destructive">{error}</p>
            ) : null}
            <div ref={containerRef} className="h-[min(42vh,360px)] w-full" />
          </>
        )}
      </CardContent>
    </Card>
  )
}
