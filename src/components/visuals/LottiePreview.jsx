import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card.jsx'

export function LottiePreview() {
  const [data, setData] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch('/lottie-demo.json')
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled) setData(json)
      })
      .catch(() => {
        if (!cancelled) setData(null)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lottie</CardTitle>
        <CardDescription>Vector animation via lottie-react (bundled JSON).</CardDescription>
      </CardHeader>
      <CardContent className="flex min-h-[200px] items-center justify-center">
        {data ? (
          <Lottie animationData={data} loop className="max-h-48 w-full max-w-xs" />
        ) : (
          <p className="text-sm text-muted-foreground">Loading animation…</p>
        )}
      </CardContent>
    </Card>
  )
}
