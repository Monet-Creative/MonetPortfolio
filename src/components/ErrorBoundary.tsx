import { Component, type ErrorInfo, type ReactNode } from "react"

type Props = { children: ReactNode }
type State = { attempt: number; failed: boolean }

const MAX_REMOUNTS = 2

// The Mercado Pago SDK can throw while unmounting a Brick that failed to initialise (blocked script,
// bad key). Remount the tree instead of leaving the visitor on a blank page.
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { attempt: 0, failed: false }

  static getDerivedStateFromError(): Partial<State> {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Recovered from a render error", error, info.componentStack)
    if (this.state.attempt < MAX_REMOUNTS) this.setState({ attempt: this.state.attempt + 1, failed: false })
  }

  render() {
    if (this.state.failed) {
      if (this.state.attempt < MAX_REMOUNTS) return null // remounting on the next tick
      return (
        <div className="grid min-h-screen place-items-center bg-black px-6 text-center text-paper">
          <p>
            Algo deu errado.{" "}
            <a className="underline" href="/">
              Recarregar o site
            </a>
          </p>
        </div>
      )
    }
    return (
      <div key={this.state.attempt} style={{ display: "contents" }}>
        {this.props.children}
      </div>
    )
  }
}
