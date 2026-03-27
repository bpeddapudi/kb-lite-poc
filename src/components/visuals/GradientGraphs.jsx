import { useId, useMemo, useState } from 'react'

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function interpolateHex(a, b, t) {
  const pa = Number.parseInt(a.slice(1), 16)
  const pb = Number.parseInt(b.slice(1), 16)
  const ar = (pa >> 16) & 255
  const ag = (pa >> 8) & 255
  const ab = pa & 255
  const br = (pb >> 16) & 255
  const bg = (pb >> 8) & 255
  const bb = pb & 255
  const r = Math.round(ar + (br - ar) * t)
  const g = Math.round(ag + (bg - ag) * t)
  const bl = Math.round(ab + (bb - ab) * t)
  return `#${[r, g, bl]
    .map((v) => {
      const s = v.toString(16)
      return s.length === 1 ? `0${s}` : s
    })
    .join('')}`
}

function getDynamicGradient(value) {
  const v = clamp(value, 0, 100)
  if (v <= 50) {
    const t = v / 50
    return [interpolateHex('#2096ff', '#37b8ff', t), interpolateHex('#50d1ff', '#ffbf3c', t)]
  }
  const t = (v - 50) / 50
  return [interpolateHex('#ffbf3c', '#ff8d2f', t), interpolateHex('#ff8d2f', '#ff4d67', t)]
}

const DATASET_GRADIENTS = [
  ['#2096ff', '#37b8ff'],
  ['#ff9f1c', '#ff6f3c'],
  ['#ff4d67', '#ff2e8f'],
  ['#8b5cf6', '#7c3aed'],
  ['#22c55e', '#06b6d4'],
]

function getDatasetGradient(index = 0) {
  return DATASET_GRADIENTS[index % DATASET_GRADIENTS.length]
}

function resolveGradient(mode, value, colors, datasetIndex = 0) {
  if (colors?.length >= 2) return colors
  if (mode === 'fixed') return getDatasetGradient(datasetIndex)
  if (mode === 'dataset') return getDatasetGradient(datasetIndex)
  return getDynamicGradient(value)
}

function polarPoint(cx, cy, radius, angleDeg) {
  const a = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(a),
    y: cy + radius * Math.sin(a),
  }
}

export function CircleGraph({
  value,
  size = 180,
  strokeWidth,
  mode = 'dynamic',
  colors,
  label,
  sublabel,
  valueSuffix = '%',
  variant = 'default',
  valueFontSize,
}) {
  const pct = clamp(value, 0, 100)
  const gradient = resolveGradient(mode, pct, colors)
  const id = useId()
  const resolvedStrokeWidth = strokeWidth ?? (variant === 'compact' ? 8 : 14)
  const resolvedValueFontSize =
    valueFontSize ?? (variant === 'compact' ? Math.max(12, Math.round(size * 0.18)) : Math.max(16, Math.round(size * 0.22)))
  const radius = (size - resolvedStrokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const dash = (pct / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label ?? 'Circle graph'}>
        <defs>
          <linearGradient id={`circle-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradient[0]} />
            <stop offset="100%" stopColor={gradient[1]} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(148,163,184,0.35)"
          strokeWidth={resolvedStrokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#circle-grad-${id})`}
          strokeWidth={resolvedStrokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="transition-all duration-300"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="currentColor"
          className="text-foreground"
          style={{ fontSize: `${resolvedValueFontSize}px`, fontWeight: 600 }}
        >
          {Math.round(pct)}
          {valueSuffix}
        </text>
      </svg>
      {sublabel ? <p className="text-xs text-muted-foreground">{sublabel}</p> : null}
    </div>
  )
}

export function BarGraph({ value, values, mode = 'dynamic', colors, height = 12, rounded = true, gap = 8 }) {
  const bars = values?.length ? values : [{ value, mode, colors }]
  const radiusClass = rounded ? 'rounded-full' : 'rounded-md'
  const [hovered, setHovered] = useState(null)

  return (
    <div className="relative w-full space-y-2">
      {bars.map((bar, idx) => {
        const pct = clamp(bar.value ?? 0, 0, 100)
        const gradient = resolveGradient(bar.mode ?? mode, pct, bar.colors ?? colors, idx)
        return (
          <div
            key={bar.label ?? idx}
            className="w-full"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              setHovered({
                label: bar.label ?? 'Value',
                value: Math.round(pct),
                x: e.clientX - rect.left + 10,
                y: e.clientY - rect.top - 12,
              })
            }}
            onMouseLeave={() => setHovered(null)}
          >
            {bar.label ? (
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{bar.label}</span>
                <span className="text-foreground">{Math.round(pct)}%</span>
              </div>
            ) : null}
            <div className={`w-full bg-muted/70 ${radiusClass}`} style={{ height }}>
              <div
                className={`h-full ${radiusClass} transition-all duration-300`}
                style={{
                  width: `${pct}%`,
                  background: `linear-gradient(90deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
                }}
              />
            </div>
            {idx < bars.length - 1 ? <div style={{ height: gap }} /> : null}
          </div>
        )
      })}

      {hovered ? (
        <div
          className="pointer-events-none absolute z-20 rounded-md border border-border/70 bg-background/95 px-2 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur-sm"
          style={{ left: hovered.x, top: hovered.y }}
        >
          {hovered.label}: <span className="text-foreground">{hovered.value}%</span>
        </div>
      ) : null}
    </div>
  )
}

export function RadarGraph({
  labels,
  datasets,
  size = 320,
  levels = 4,
  mode = 'dynamic',
  showLegend = true,
}) {
  const rawId = useId()
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, '')
  const cx = size / 2
  const cy = size / 2
  const maxRadius = size * 0.33
  const count = labels.length
  const [hoveredPoint, setHoveredPoint] = useState(null)

  const processed = useMemo(
    () =>
      datasets.map((set, idx) => {
        const avg = set.data.reduce((a, b) => a + b, 0) / Math.max(1, set.data.length)
        const gradient = resolveGradient(set.mode ?? mode, avg, set.colors, idx)
        const points = set.data.map((v, i) => {
          const r = maxRadius * (clamp(v, 0, 100) / 100)
          const angle = (360 / count) * i
          const p = polarPoint(cx, cy, r, angle)
          return `${p.x},${p.y}`
        })
        return {
          ...set,
          key: `${set.label ?? 'set'}-${idx}`,
          gradient,
          points: points.join(' '),
        }
      }),
    [datasets, mode, maxRadius, count, cx, cy],
  )

  return (
    <div className="relative flex flex-col gap-3">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Radar graph">
        <defs>
          {processed.map((set) => (
            <linearGradient key={set.key} id={`${id}-${set.key}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={set.gradient[0]} />
              <stop offset="100%" stopColor={set.gradient[1]} />
            </linearGradient>
          ))}
        </defs>

        {Array.from({ length: levels }).map((_, li) => {
          const ringR = (maxRadius * (li + 1)) / levels
          const ringPoints = labels.map((_, i) => {
            const a = (360 / count) * i
            const p = polarPoint(cx, cy, ringR, a)
            return `${p.x},${p.y}`
          })
          return (
            <polygon
              key={`ring-${li}`}
              points={ringPoints.join(' ')}
              fill="none"
              stroke="rgba(148,163,184,0.42)"
              strokeWidth="1"
            />
          )
        })}

        {labels.map((label, i) => {
          const a = (360 / count) * i
          const p = polarPoint(cx, cy, maxRadius + 18, a)
          const axisEnd = polarPoint(cx, cy, maxRadius, a)
          return (
            <g key={label}>
              <line x1={cx} y1={cy} x2={axisEnd.x} y2={axisEnd.y} stroke="rgba(148,163,184,0.34)" strokeWidth="1" />
              <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-[10px]">
                {label}
              </text>
            </g>
          )
        })}

        {processed.map((set) => (
          <g key={set.key}>
            <polygon
              points={set.points}
              fill={`url(#${id}-${set.key})`}
              fillOpacity={set.fillOpacity ?? 0.18}
              stroke={set.gradient[1]}
              strokeWidth={set.strokeWidth ?? 2}
              className="transition-all duration-300"
            />
            {set.data.map((pointValue, pointIdx) => {
              const r = maxRadius * (clamp(pointValue, 0, 100) / 100)
              const angle = (360 / count) * pointIdx
              const p = polarPoint(cx, cy, r, angle)
              const active =
                hoveredPoint &&
                hoveredPoint.datasetIndex === processed.findIndex((d) => d.key === set.key) &&
                hoveredPoint.pointIndex === pointIdx
              return (
                <g key={`${set.key}-point-${labels[pointIdx]}`}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={active ? 4.5 : 3}
                    fill={set.gradient[1]}
                    stroke="rgba(15,23,42,0.5)"
                    strokeWidth="1"
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => {
                      setHoveredPoint({
                        datasetIndex: processed.findIndex((d) => d.key === set.key),
                        pointIndex: pointIdx,
                        datasetLabel: set.label,
                        axisLabel: labels[pointIdx],
                        value: pointValue,
                        x: p.x + 10,
                        y: p.y - 12,
                      })
                    }}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={12}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => {
                      setHoveredPoint({
                        datasetIndex: processed.findIndex((d) => d.key === set.key),
                        pointIndex: pointIdx,
                        datasetLabel: set.label,
                        axisLabel: labels[pointIdx],
                        value: pointValue,
                        x: p.x + 10,
                        y: p.y - 12,
                      })
                    }}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                </g>
              )
            })}
          </g>
        ))}
      </svg>

      {showLegend ? (
        <div className="flex flex-wrap gap-3 text-xs">
          {processed.map((set) => (
            <div key={`legend-${set.key}`} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${set.gradient[0]} 0%, ${set.gradient[1]} 100%)`,
                }}
              />
              <span className="text-muted-foreground">{set.label}</span>
            </div>
          ))}
        </div>
      ) : null}

      {hoveredPoint ? (
        <div
          className="pointer-events-none absolute z-20 rounded-md border border-border/70 bg-background/95 px-2 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur-sm"
          style={{ left: hoveredPoint.x, top: hoveredPoint.y }}
        >
          <span className="text-foreground">{hoveredPoint.datasetLabel}</span> · {hoveredPoint.axisLabel}:{' '}
          <span className="text-foreground">{Math.round(hoveredPoint.value)}%</span>
        </div>
      ) : null}
    </div>
  )
}
