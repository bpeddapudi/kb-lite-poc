import { Component } from 'react'

export class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Something went wrong loading this block.</p>
            <p className="mt-1 font-mono text-xs opacity-80">{String(this.state.error?.message ?? this.state.error)}</p>
          </div>
        )
      )
    }
    return this.props.children
  }
}
