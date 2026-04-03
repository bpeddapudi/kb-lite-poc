import { useId } from 'react'

/**
 * SVG world map (hand-authored paths) — lightweight alternative to Lottie.
 * Inspired by the motion/color idea of community world-map animations such as
 * https://lottiefiles.com/free-animation/world-map-VtT6tv4pK8 (not a trace of their asset).
 *
 * viewBox matches equirectangular-ish flat map proportions.
 */
const VB = '0 0 1000 485'

/** Simplified continents — POC accuracy, readable at small sizes */
const REGIONS = [
  {
    id: 'americas',
    d: 'M 118 118 C 72 168 58 248 104 308 C 138 352 188 378 228 412 C 268 438 292 402 284 352 C 276 302 248 268 232 228 C 216 188 228 148 258 122 C 288 96 332 88 352 118 C 372 148 356 198 324 228 C 292 258 268 298 276 342 C 284 386 324 428 372 442 C 420 456 468 428 488 378 C 508 328 492 268 452 228 C 412 188 388 148 372 108 C 356 68 308 48 258 58 C 208 68 158 88 118 118 Z',
    fill: '#15803d',
  },
  {
    id: 'greenland',
    d: 'M 332 42 C 312 58 308 88 328 108 C 348 128 378 118 392 92 C 406 66 398 38 372 32 C 346 26 338 38 332 42 Z',
    fill: '#166534',
  },
  {
    id: 'eurasia',
    d: 'M 428 72 C 468 48 528 52 588 68 C 648 84 712 108 768 148 C 824 188 852 248 832 308 C 812 368 748 392 688 378 C 628 364 572 328 528 288 C 484 248 448 198 432 148 C 416 98 408 88 428 72 Z',
    fill: '#16a34a',
  },
  {
    id: 'africa',
    d: 'M 488 212 C 532 196 576 220 596 272 C 616 324 608 388 572 428 C 536 468 484 462 452 422 C 420 382 428 328 448 288 C 468 248 468 220 488 212 Z',
    fill: '#22c55e',
  },
  {
    id: 'australia',
    d: 'M 772 328 C 816 312 868 332 884 378 C 900 424 872 462 824 468 C 776 474 736 448 728 408 C 720 368 744 336 772 328 Z',
    fill: '#4ade80',
  },
  {
    id: 'nz',
    d: 'M 902 388 C 918 396 922 412 912 422 C 902 432 888 426 884 412 C 880 398 890 384 902 388 Z',
    fill: '#86efac',
  },
]

/**
 * Variant A — filled regions, subtle breathe (CSS), Galaxy-ish rim glow via drop-shadow in parent
 */
export function WorldMapSvgFilled({ className = '' }) {
  const gid = `wm-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  return (
    <svg
      viewBox={VB}
      className={`wm-filled-map text-emerald-400 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <filter id={`${gid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g className="origin-center motion-safe:animate-[wm-breathe_5s_ease-in-out_infinite]" style={{ transformBox: 'fill-box' }}>
        {REGIONS.map((r) => (
          <path key={r.id} d={r.d} fill={r.fill} opacity={0.92} filter={`url(#${gid}-glow)`} className="transition-colors duration-300" />
        ))}
      </g>
    </svg>
  )
}

/**
 * Variant B — monoline outlines, staggered “scan” pulse (no Lottie / no dash math)
 */
export function WorldMapSvgOutline({ className = '' }) {
  return (
    <svg viewBox={VB} className={`wm-outline-map ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className="text-sky-400/90">
        {REGIONS.map((r, i) => (
          <path
            key={r.id}
            d={r.d}
            fill="none"
            className="motion-safe:animate-[wm-outline-pulse_2.4s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </g>
    </svg>
  )
}
