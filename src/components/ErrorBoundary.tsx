import React from 'react'

interface State {
  hasError: boolean
  error?: Error | null
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: any) {
    console.error('🧯 Uncaught error in component tree:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center p-8 border border-emerald/20 rounded-lg shadow-lg bg-gradient-to-br from-black/60 to-black/30">
            <h2 className="text-2xl font-bold text-emerald mb-2">Qualcosa è andato storto</h2>
            <p className="text-white/60 mb-4">L'app ha riscontrato un errore. Ricarica la pagina o contatta il supporto.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-emerald text-black font-semibold rounded"
            >
              Ricarica
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
