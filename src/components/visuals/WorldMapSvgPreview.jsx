import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card.jsx'
import { WorldMapSvgFilled, WorldMapSvgOutline } from './WorldMapSvg.jsx'

/**
 * Replaces the old Lottie demo: pure SVG world maps (no lottie-web, no JSON fetch).
 */
export function WorldMapSvgPreview() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>World map (SVG) — filled</CardTitle>
          <CardDescription>
            Multi-color regions, subtle breathe. SVG alternative to heavy Lottie embeds. Inspiration:{' '}
            <a
              href="https://lottiefiles.com/free-animation/world-map-VtT6tv4pK8"
              className="text-primary underline-offset-4 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              LottieFiles world map
            </a>{' '}
            (motion recreated in CSS, not a trace).
          </CardDescription>
        </CardHeader>
        <CardContent className="flex min-h-[200px] items-center justify-center rounded-lg bg-muted/30 p-6">
          <WorldMapSvgFilled className="h-auto w-full max-w-md drop-shadow-[0_0_20px_rgba(34,197,94,0.25)]" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>World map (SVG) — outline</CardTitle>
          <CardDescription>Stroke-only continents with staggered pulse — good for dark UI chrome.</CardDescription>
        </CardHeader>
        <CardContent className="flex min-h-[200px] items-center justify-center rounded-lg bg-muted/30 p-6">
          <WorldMapSvgOutline className="h-auto w-full max-w-md text-primary" />
        </CardContent>
      </Card>
    </div>
  )
}
