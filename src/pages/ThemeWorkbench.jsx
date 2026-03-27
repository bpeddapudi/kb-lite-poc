import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'

import { ErrorBoundary } from '../components/ErrorBoundary.jsx'
import { SimpleMapboxMap } from '../components/visuals/SimpleMapboxMap.jsx'
import { ThemeDropdown } from '../components/theme/ThemeDropdown.jsx'
import { Button } from '../components/ui/button.jsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card.jsx'

const MapboxPreview = lazy(() =>
  import('../components/visuals/MapboxPreview.jsx').then((m) => ({ default: m.MapboxPreview })),
)
const ThreePreview = lazy(() =>
  import('../components/visuals/ThreePreview.jsx').then((m) => ({ default: m.ThreePreview })),
)
const LottiePreview = lazy(() =>
  import('../components/visuals/LottiePreview.jsx').then((m) => ({ default: m.LottiePreview })),
)

function VisualFallback() {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 p-8 text-sm text-muted-foreground">
      Loading preview…
    </div>
  )
}

/** Theme tokens, Mapbox, Three, Lottie preview (moved from /lite). */
export function ThemeWorkbench() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Home
            </Link>
            <span className="text-lg font-semibold tracking-tight">IOA Workbench</span>
            <span className="hidden rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground sm:inline">
              /theme
            </span>
            <Link
              to="/lite"
              className="hidden text-sm text-primary underline-offset-4 hover:underline sm:inline"
            >
              kb lite app
            </Link>
          </div>
          <nav className="flex items-center gap-3" aria-label="Main">
            <span className="hidden text-sm text-muted-foreground sm:inline">Theme</span>
            <ThemeDropdown />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
        <section className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Theme lab</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Component &amp; media preview</h1>
          <p className="max-w-2xl text-pretty text-muted-foreground">
            Reusable buttons and cards, plus Mapbox, Three.js, and Lottie. Use the theme control in
            the header to switch themes (including{' '}
            <strong className="font-medium text-foreground">Blueprint</strong>).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium">Mapbox (simple map)</h2>
          <p className="text-sm text-muted-foreground">
            2D map with zoom controls — confirms your{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">VITE_MAPBOX_TOKEN</code> is loaded.
          </p>
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">North America preview</CardTitle>
              <CardDescription>Dark style · mercator · defaults</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-4">
              <SimpleMapboxMap />
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="brand">Brand</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Cards</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Card title</CardTitle>
                <CardDescription>Uses theme tokens for border, background, and text.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Content area with muted foreground for secondary copy.
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button size="sm">Action</Button>
                <Button size="sm" variant="outline">
                  Cancel
                </Button>
              </CardFooter>
            </Card>
            <Card className="bg-surface-elevated">
              <CardHeader>
                <CardTitle>Elevated surface</CardTitle>
                <CardDescription>Uses the surface-elevated token per theme.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Dark and Midnight themes lift surfaces slightly for hierarchy.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Visual integrations</h2>
          <p className="text-sm text-muted-foreground">
            Loaded on demand so a WebGL or map error does not blank the whole page.
          </p>
          <ErrorBoundary>
            <Suspense fallback={<VisualFallback />}>
              <div className="grid gap-6 lg:grid-cols-2">
                <MapboxPreview />
                <ThreePreview />
              </div>
              <div className="mt-6">
                <LottiePreview />
              </div>
            </Suspense>
          </ErrorBoundary>
        </section>
      </main>
    </div>
  )
}
