import { useCallback, useState } from 'react'

const BRAND_RED = 'var(--color-brand-red, #E31B23)'

/**
 * Theme-aware canvas + grain + mouse-follow Equinix pulse glow.
 */
export function FoundationalShell({ children }) {
  const [glow, setGlow] = useState({ x: 50, y: 50 })

  const onMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setGlow({ x, y })
  }, [])

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-background text-foreground"
      onMouseMove={onMouseMove}
    >
      {/* Equinix Pulse — radial glow follows pointer */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, ${BRAND_RED}33 0%, transparent 55%)`,
        }}
      />
      <img
        src="/grain.svg"
        alt=""
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] h-full w-full object-cover opacity-[0.03]"
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
