import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '../components/ui/button.jsx'
import { EQUINIX_EMBLEM_PATH, EQUINIX_EMBLEM_VIEWBOX } from '../components/visuals/equinixEmblemPath.generated.js'
import { RedwoodCityMapboxEmbed } from '../components/visuals/RedwoodCityMapboxEmbed.jsx'

/**
 * POC: Map embed preloaders — multiple directions in one view.
 * Equinix Blueprint color inspiration: https://tailwind-blueprint.vercel.app/foundations/colors/
 * CSS Continuous #3 from https://css-loaders.com/continuous/
 */

const DEFAULT_LOAD_MS = 2800

/** Single line — map-focused, not generic “Loading”. */
const MAP_STATUS_LINE = "Hang tight — we're framing your map"

function MapPreloaderGraphic({ variant, theme }) {
  switch (variant) {
    case 'v1':
      return <div className="mp-loader-c3-v1" />
    case 'v2':
      return <EquinixEmblemPathLoader theme={theme} />
    case 'css-c3':
      return <div className="mp-loader-c3" />
    default:
      return <div className="mp-loader-c3-v1" />
  }
}

/* -------------------------------------------------------------------------- */
/* Dot field + iris                                                             */
/* -------------------------------------------------------------------------- */

function DotFieldCanvas({ className, theme = 'dark' }) {
  const ref = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let t = 0
    const dots = []
    const isLight = theme === 'light'

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.floor(rect.width * dpr)
      h = Math.floor(rect.height * dpr)
      canvas.width = w
      canvas.height = h
      dots.length = 0
      const step = 14 * dpr
      for (let x = step; x < w; x += step) {
        for (let y = step; y < h; y += step) {
          dots.push({ x, y, o: Math.random() * Math.PI * 2 })
        }
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const tick = () => {
      t += 0.016
      ctx.clearRect(0, 0, w, h)
      const cx = w * 0.5
      const cy = h * 0.48
      for (const d of dots) {
        const dx = d.x - cx
        const dy = d.y - cy
        const dist = Math.sqrt(dx * dx + dy * dy) / (Math.min(w, h) * 0.55)
        const pulse = 0.35 + 0.45 * Math.sin(t * 2.2 + d.o + dist * 4)
        const alpha = 0.08 + pulse * 0.35
        ctx.fillStyle = isLight
          ? `rgba(71, 85, 105, ${alpha * 0.95})`
          : `rgba(148, 163, 184, ${alpha})`
        ctx.beginPath()
        ctx.arc(d.x, d.y, 1.1 * (window.devicePixelRatio || 1), 0, Math.PI * 2)
        ctx.fill()
      }
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)

    return () => {
      ro.disconnect()
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [theme])

  return <canvas ref={ref} className={className} aria-hidden />
}

function useMapDemoPhase(loadMs) {
  const [phase, setPhase] = useState('loading')
  const [restartSeq, setRestartSeq] = useState(0)
  const startReveal = useCallback(() => {
    setPhase('exiting')
    window.setTimeout(() => setPhase('ready'), 560)
  }, [])
  useEffect(() => {
    if (phase !== 'loading') return
    const id = window.setTimeout(startReveal, loadMs)
    return () => window.clearTimeout(id)
  }, [phase, loadMs, startReveal, restartSeq])

  const restartLoading = useCallback(() => {
    setRestartSeq((s) => s + 1)
    setPhase('loading')
  }, [])

  return [phase, setPhase, restartLoading]
}

/** Gray track + gradient segment along path traced from public/Equinix-Emblem.png (see npm run trace:emblem). */
function EquinixEmblemPathLoader({ className = '', theme = 'dark' }) {
  const gradId = useId().replace(/:/g, '')
  const gid = `mp-eqx-emblem-grad-${gradId}`
  const trackStroke = theme === 'light' ? 'oklch(0.58 0.03 264)' : 'oklch(0.42 0.02 264)'

  return (
    <div className={`mx-auto w-[min(320px,92vw)] ${className}`} aria-hidden>
      <svg
        viewBox={EQUINIX_EMBLEM_VIEWBOX}
        className="h-auto w-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e31b23" />
            <stop offset="45%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <path
          pathLength="100"
          fill="none"
          stroke={trackStroke}
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="nonScalingStroke"
          d={EQUINIX_EMBLEM_PATH}
        />
        <path
          className="mp-eqx-emblem-path-progress"
          pathLength="100"
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="6.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="nonScalingStroke"
          d={EQUINIX_EMBLEM_PATH}
        />
      </svg>
    </div>
  )
}

function LoaderPreviewCard({ selected, onClick, title, description, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 ${
        selected
          ? 'border-sky-400/55 bg-sky-500/10 shadow-[0_0_0_1px_rgba(56,189,248,0.2)]'
          : 'border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]'
      }`}
    >
      <div className="flex h-[7.5rem] items-center justify-center overflow-hidden rounded-lg bg-[#060a12]/90 ring-1 ring-white/5">
        {children}
      </div>
      <p className="mt-3 text-sm font-medium text-white/90">{title}</p>
      <p className="mt-0.5 text-xs text-white/50">{description}</p>
    </button>
  )
}

function IrisMapFrame({ phase, theme, children }) {
  const isLight = theme === 'light'
  const frameBorder = isLight ? 'border-slate-200/80 bg-slate-100' : 'border-white/10 bg-[#0c1220]'
  const overlayGradient = isLight
    ? 'from-slate-200/35 via-slate-100/50 to-white/92'
    : 'from-[#060a12]/20 via-transparent to-[#060a12]/85'

  return (
    <div className={`relative overflow-hidden rounded-2xl border shadow-2xl ${frameBorder}`}>
      <div className="aspect-[16/9] w-full" />
      <div
        className={`absolute inset-0 z-10 ${
          phase === 'ready' ? 'pointer-events-none opacity-0' : 'opacity-100'
        } ${phase === 'exiting' ? 'scale-[1.02]' : 'scale-100'} transition-opacity duration-300`}
        style={{
          clipPath:
            phase === 'loading' ? 'circle(150% at 50% 50%)' : phase === 'exiting' ? 'circle(0% at 50% 50%)' : 'circle(0% at 50% 50%)',
          transition:
            phase === 'exiting' || phase === 'ready'
              ? 'clip-path 560ms cubic-bezier(0.4, 0, 0.2, 1), transform 560ms cubic-bezier(0.4, 0, 0.2, 1)'
              : 'none',
        }}
      >
        <DotFieldCanvas theme={theme} className="absolute inset-0 h-full w-full opacity-90" />
        <div className={`absolute inset-0 bg-gradient-to-b ${overlayGradient}`} />
        <div
          data-preloader-theme={theme}
          className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-4 py-6"
        >
          {children}
        </div>
      </div>
      {phase === 'ready' ? (
        <div className={`absolute inset-0 z-0 flex min-h-0 flex-col ${isLight ? 'bg-slate-100' : 'bg-[#0c1220]'}`}>
          <RedwoodCityMapboxEmbed appearance={theme} className="min-h-0 flex-1" />
          <div
            className={`flex shrink-0 items-center justify-between border-t px-3 py-2 text-[10px] ${
              isLight ? 'border-slate-200/90 bg-white/95 text-slate-500' : 'border-white/10 bg-black/50 text-white/50'
            }`}
          >
            <span>© Mapbox © OpenStreetMap</span>
            <span className={isLight ? 'text-slate-400' : 'text-white/35'}>POC</span>
          </div>
        </div>
      ) : (
        <div className={`absolute inset-0 z-0 ${isLight ? 'bg-slate-100' : 'bg-[#0c1220]'}`} aria-hidden />
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Page                                                                         */
/* -------------------------------------------------------------------------- */

export function MapPreloaderExperiment() {
  const [loadMs, setLoadMs] = useState(DEFAULT_LOAD_MS)
  const [variant, setVariant] = useState('v2')
  const [mapTheme, setMapTheme] = useState('dark')
  const [phase, , restartLoading] = useMapDemoPhase(loadMs)

  const reloadMap = () => {
    restartLoading()
  }

  const selectVariant = (v) => {
    setVariant(v)
    restartLoading()
  }

  const showEquinixEmblem = variant === 'v1'
  const isCssVariant = variant === 'css-c3'
  const stackGap =
    variant === 'v1' ? 'gap-4' : variant === 'v2' ? 'gap-6' : 'gap-8'
  /* Subtle caption: small + muted so loaders stay the focus */
  const statusTextClass =
    mapTheme === 'light'
      ? 'max-w-md text-balance text-center text-[11px] font-normal leading-snug text-slate-500 sm:text-xs sm:leading-relaxed'
      : 'max-w-md text-balance text-center text-[11px] font-normal leading-snug text-white/38 sm:text-xs sm:leading-relaxed'

  return (
    <div className="min-h-screen bg-[#060a12] text-foreground">
      <header className="border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">POC</p>
            <h1 className="text-sm font-semibold text-white/90">Map preloader — direction mocks</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Link to="/landing" className="text-white/55 transition hover:text-white">
              Landing
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6">
        {/* A — Single map + preloader picker */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">A — Dot field + iris → Mapbox (Redwood City)</h2>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-white/25 bg-white/5 text-white hover:bg-white/10"
              onClick={reloadMap}
            >
              Reload map
            </Button>
            <span className="text-xs text-white/55">Map style</span>
            <div
              className="inline-flex rounded-lg border border-white/15 bg-white/[0.06] p-0.5"
              role="group"
              aria-label="Map light or dark preview"
            >
              <button
                type="button"
                onClick={() => setMapTheme('dark')}
                className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                  mapTheme === 'dark' ? 'bg-white/15 text-white shadow-sm' : 'text-white/45 hover:text-white/75'
                }`}
              >
                Dark
              </button>
              <button
                type="button"
                onClick={() => setMapTheme('light')}
                className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                  mapTheme === 'light' ? 'bg-white/15 text-white shadow-sm' : 'text-white/45 hover:text-white/75'
                }`}
              >
                Light
              </button>
            </div>
            <span className="text-xs text-white/55">Simulated load:</span>
            <select
              className="rounded-md border border-white/15 bg-white/5 px-2 py-1.5 text-xs text-white"
              value={loadMs}
              onChange={(e) => {
                setLoadMs(Number(e.target.value))
                restartLoading()
              }}
            >
              <option value={2800}>2.8s</option>
              <option value={5000}>5s</option>
              <option value={1200}>1.2s</option>
            </select>
            <span className="text-xs text-white/40">
              {phase === 'loading' ? 'Loading…' : phase === 'exiting' ? 'Revealing…' : 'Map ready'}
            </span>
          </div>

          <IrisMapFrame phase={phase} theme={mapTheme}>
            <div className={`flex w-full max-w-md flex-col items-center ${stackGap}`}>
              {showEquinixEmblem ? (
                <img
                  src="/Equinix-Emblem.png"
                  alt=""
                  className={`h-10 w-auto sm:h-12 ${
                    mapTheme === 'light'
                      ? 'opacity-95 drop-shadow-[0_2px_12px_rgba(227,27,35,0.25)]'
                      : 'opacity-95 drop-shadow-[0_0_24px_rgba(227,27,35,0.35)]'
                  }`}
                />
              ) : null}
              <p className={statusTextClass}>{MAP_STATUS_LINE}</p>
              <div
                className={`flex w-full flex-col items-center justify-center ${
                  isCssVariant ? 'min-h-[5.5rem] sm:min-h-[6rem]' : ''
                }`}
              >
                <MapPreloaderGraphic variant={variant} theme={mapTheme} />
              </div>
            </div>
          </IrisMapFrame>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-white/40">Preloader previews</p>
            <p className="mb-3 text-xs text-white/45">Click a card to run that preloader on the map above.</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <LoaderPreviewCard
                selected={variant === 'v1'}
                onClick={() => selectVariant('v1')}
                title="Version 1 — Continuous #3 bar"
                description="Skewed bar, sliding gradient (wide / short variant)."
              >
                <div data-preloader-theme={mapTheme} className="flex scale-[0.85] flex-col items-center gap-3">
                  <img src="/Equinix-Emblem.png" alt="" className="h-6 w-auto opacity-90" />
                  <div className="mp-loader-c3-v1" />
                </div>
              </LoaderPreviewCard>
              <LoaderPreviewCard
                selected={variant === 'v2'}
                onClick={() => selectVariant('v2')}
                title="Version 2 — Emblem path stroke"
                description="Gradient travels along the traced emblem outline (no duplicate mark above)."
              >
                <div className="flex w-full justify-center scale-[0.38]">
                  <EquinixEmblemPathLoader theme={mapTheme} />
                </div>
              </LoaderPreviewCard>
              <LoaderPreviewCard
                selected={variant === 'css-c3'}
                onClick={() => selectVariant('css-c3')}
                title="CSS — Continuous #3"
                description="css-loaders.com — skewed bar, sliding gradient on dark track."
              >
                <div data-preloader-theme={mapTheme} className="flex scale-90 items-center justify-center py-2">
                  <div className="mp-loader-c3" />
                </div>
              </LoaderPreviewCard>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        /* Continuous #3 — Equinix gradient chip on dark track */
        .mp-loader-c3 {
          width: 120px;
          height: 20px;
          transform: skewX(-45deg);
          background:
            linear-gradient(90deg, #e31b23 0%, #f97316 45%, #a855f7 100%) left -30px top 0 / 30px 20px no-repeat
            oklch(0.32 0.02 264);
          animation: mp-l3 1s infinite linear;
        }
        @keyframes mp-l3 {
          100% { background-position: right -30px top 0; }
        }

        /* Version 1: ~50% wider bar; height 25% less than prior 14px → 10.5px */
        .mp-loader-c3-v1 {
          width: 180px;
          height: 10.5px;
          transform: skewX(-45deg);
          background:
            linear-gradient(90deg, #e31b23 0%, #f97316 45%, #a855f7 100%) left -45px top 0 / 45px 10.5px no-repeat
            oklch(0.32 0.02 264);
          animation: mp-l3-v1 1s infinite linear;
        }
        @keyframes mp-l3-v1 {
          100% { background-position: right -45px top 0; }
        }

        [data-preloader-theme="light"] .mp-loader-c3 {
          background:
            linear-gradient(90deg, #e31b23 0%, #f97316 45%, #a855f7 100%) left -30px top 0 / 30px 20px no-repeat
            oklch(0.90 0.02 264);
        }
        [data-preloader-theme="light"] .mp-loader-c3-v1 {
          background:
            linear-gradient(90deg, #e31b23 0%, #f97316 45%, #a855f7 100%) left -45px top 0 / 45px 10.5px no-repeat
            oklch(0.90 0.02 264);
        }
        /* Version 2: gradient segment travels along traced emblem path (~30% slower than 1.4s) */
        .mp-eqx-emblem-path-progress {
          stroke-dasharray: 18 82;
          stroke-dashoffset: 0;
          animation: mp-eqx-emblem-path-loop 2s linear infinite;
        }
        @keyframes mp-eqx-emblem-path-loop {
          to {
            stroke-dashoffset: -100;
          }
        }

      `}</style>
    </div>
  )
}
