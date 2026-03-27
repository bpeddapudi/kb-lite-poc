import { Link } from 'react-router-dom'

import { FoundationalShell } from '../components/gallery/FoundationalShell.jsx'
import { BarGraph, CircleGraph, RadarGraph } from '../components/visuals/GradientGraphs.jsx'

/**
 * kb lite app (/lite) — reset to a clean shell; add tiles here as you build.
 */
export function LiteGallery() {
  const sampleValue = 68
  const dynamicBars = [
    { label: 'Integration effort', value: 44 },
    { label: 'Governance overhead', value: 72 },
    { label: 'Vendor management load', value: 86 },
  ]
  const radarLabels = ['Security', 'Scalability', 'Cost', 'AI', 'Performance', 'Compliance']
  const radarDatasets = [
    { label: 'Current state', data: [52, 68, 59, 40, 63, 54], mode: 'dataset' },
    { label: 'Target state', data: [74, 80, 66, 72, 78, 69], mode: 'dataset' },
  ]

  return (
    <FoundationalShell>
      <header className="border-b border-border/70 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              IOA Workbench 2.0
            </p>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">kb lite app</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link to="/" className="text-muted-foreground transition hover:text-foreground">
              Home
            </Link>
            <Link
              to="/theme"
              className="rounded-md border border-border bg-card/60 px-3 py-1.5 text-foreground/85 backdrop-blur-sm transition hover:bg-accent/60"
            >
              Theme lab →
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-4 px-4 py-10 sm:px-6">
        <section className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm lg:col-span-2">
            <p className="text-sm font-medium text-foreground">Provider count (dynamic gradient)</p>
            <p className="mb-4 text-xs text-muted-foreground">
              Color shifts from blue tones at low values to warm red tones near max.
            </p>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <CircleGraph value={sampleValue} size={220} mode="dynamic" sublabel="Dynamic mode" />
              <div className="w-full max-w-xs space-y-3">
                {dynamicBars.map((metric) => (
                  <div key={metric.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{metric.label}</span>
                      <span className="text-foreground">{metric.value}%</span>
                    </div>
                    <BarGraph value={metric.value} mode="dynamic" />
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm">
            <p className="text-sm font-medium text-foreground">Fixed color mode</p>
            <p className="mb-4 text-xs text-muted-foreground">Use brand-led palette when color must stay constant.</p>
            <div className="space-y-4">
              <CircleGraph value={82} size={150} mode="fixed" colors={['#ff9f1c', '#ff4d67']} />
              <div className="space-y-2">
                <BarGraph value={58} mode="fixed" colors={['#2096ff', '#37b8ff']} />
                <BarGraph value={82} mode="fixed" colors={['#ff9f1c', '#ff4d67']} />
              </div>
            </div>
          </article>
        </section>

        <section className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm">
          <p className="text-sm font-medium text-foreground">Radar chart (multi-dataset)</p>
          <p className="mb-4 text-xs text-muted-foreground">
            Supports multiple datasets similar to Chart.js radar input.
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            <RadarGraph labels={radarLabels} datasets={radarDatasets} size={320} />
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Multi-value bar support</p>
              <BarGraph
                values={[
                  { label: 'Current architecture', value: 52, mode: 'dataset' },
                  { label: 'Target architecture', value: 78, mode: 'dataset' },
                  { label: 'Industry baseline', value: 61, mode: 'fixed', colors: ['#7d879b', '#a7b0c2'] },
                ]}
              />
            </div>
          </div>
        </section>
      </main>
    </FoundationalShell>
  )
}
