import Header from "./components/Header"
import Hero from "./components/Hero"
import ClientLogos from "./components/ClientLogos"
import Cases from "./components/Cases"
import ToolsSection from "./components/ToolsSection"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import { LanguageProvider } from "./i18n"

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black">
        <Header />
        <main>
          <Hero />
          <ClientLogos />
          <Cases />
          <ToolsSection />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
