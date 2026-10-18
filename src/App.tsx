import { useEffect, useState } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import ClientLogos from "./components/ClientLogos"
import Services from "./components/Services"
import Pricing from "./components/Pricing"
import Cases from "./components/Cases"
import Reels from "./components/Reels"
import Method from "./components/Method"
import Faq from "./components/Faq"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import WhatsAppButton from "./components/WhatsAppButton"
import Checkout from "./components/Checkout"
import ConsentBanner from "./components/ConsentBanner"
import ErrorBoundary from "./components/ErrorBoundary"
import { LanguageProvider } from "./i18n"
import { observeSectionViews } from "./lib/analytics"
import { isOfferId, type OfferId } from "./lib/catalog"

// Hash routes keep the static host simple: #/checkout/<offer> and #/checkout/<offer>/payment/<id>.
type Route = { name: "home" } | { name: "checkout"; offerId: OfferId; paymentId?: string }

function parseRoute(hash: string): Route {
  const match = /^#\/checkout\/([a-z0-9_]+)(?:\/payment\/([^/]+))?$/.exec(hash)
  if (match && isOfferId(match[1])) return { name: "checkout", offerId: match[1], paymentId: match[2] }
  return { name: "home" }
}

function useRoute(): Route {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener("hashchange", onChange)
    return () => window.removeEventListener("hashchange", onChange)
  }, [])

  return parseRoute(hash)
}

function Site() {
  useEffect(() => observeSectionViews(), [])

  // Coming back from checkout: the anchor target did not exist when the hash changed.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id || id.startsWith("/")) return
    // Wait a frame so the freshly mounted sections have a layout; jump (no smooth animation) like a normal anchor.
    const jump = () => document.getElementById(id)?.scrollIntoView({ behavior: "instant" })
    const frame = requestAnimationFrame(jump)
    const retry = window.setTimeout(jump, 150) // images/marquee settle after the first frame
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(retry)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Hero />
        <ClientLogos />
        <Services />
        <Cases />
        <Reels />
        <Method />
        <Pricing />
        <Contact />
        <Faq />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

function Routes() {
  const route = useRoute()
  if (route.name === "checkout") return <Checkout key={route.offerId} offerId={route.offerId} paymentId={route.paymentId} />
  return <Site />
}

export default function App() {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
      <ConsentBanner />
    </LanguageProvider>
  )
}
