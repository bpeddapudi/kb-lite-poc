import { Link } from 'react-router-dom'

import { Button } from '../components/ui/button.jsx'

/**
 * Marketing entry — kb lite app at /lite, theme lab at /theme, chat app at /chat-interface.
 */
export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, oklch(0.45 0.2 264 / 0.35), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, oklch(0.55 0.18 25 / 0.2), transparent)',
        }}
      />
      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Equinix · IOA® Workbench Lite
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          From static forms to an interactive architecture builder
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Show the move from legacy centralized IT to a modern, distributed Edge — interconnection with
          speed, security, and global reach. Premium SaaS aesthetic: deep surfaces, glass, motion, and 3D.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button asChild size="lg" className="rounded-lg">
            <Link to="/lite">kb lite app</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="rounded-lg">
            <Link to="/chat-interface">Chat interface app</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-lg">
            <Link to="/theme">Theme lab</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-lg">
            <Link to="/map-preloader">Map preloader POC</Link>
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          <code className="rounded bg-muted px-2 py-1 font-mono text-xs">/lite</code> — gallery &amp; globe ·{' '}
          <code className="rounded bg-muted px-2 py-1 font-mono text-xs">/chat-interface</code> — chat POC ·{' '}
          <code className="rounded bg-muted px-2 py-1 font-mono text-xs">/map-preloader</code> — map loader POC ·{' '}
          <code className="rounded bg-muted px-2 py-1 font-mono text-xs">/theme</code> — tokens &amp; previews
        </p>
        <p className="mt-12 text-xs text-muted-foreground">
          Blueprint theme + design refs:{' '}
          <a
            href="https://tailwind-blueprint.vercel.app/foundations/colors/"
            className="text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Equinix Blueprint
          </a>
          .
        </p>
      </div>
    </div>
  )
}
